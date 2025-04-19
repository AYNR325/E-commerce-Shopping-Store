// const stripe = require("../../helpers/Stripe");
// const User =require("../../models/User")

// const paymentController=async(req,res)=>{
//     try {
//         const {cartItems}=req.body;
        
//         console.log(cartItems)
//         const user= await User.findOne({
//             _id:cartItems.userId
//         })
//         console.log(user.email)

//         const params={
//             submit_type:'pay',
//             mode:'payment',
//             payment_method_types:['card'],
//             billing_address_collection:'auto',
//             customer_email:user.email,
//             line_items : cartItems.items.map((item,index)=>{
//                 return{
//                     price_data:{
//                         currency:'usd',
//                         product_data:{
//                             name:item.title,
//                             images:[item.image],
//                             metadata:{
//                                 productId:item.productId,
//                             }
//                         },
//                         unit_amount: item.salePrice !== null ? item.salePrice : item.price
//                     },
//                     adjustable_quantity:{
//                         enabled:true,
//                         minimum:1
//                     },
//                     quantity:item.quantity
//                 }
//             }),
//             success_url:'http://localhost:5173/shop/success',
//             cancel_url:'http://localhost:5173/shop/cancel'
//         }

//         const session = await stripe.checkout.sessions.create(params)
//         console.log(session)
//         res.status(303).json(session);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success: false,
//             message: "Error occured while processing payment",
//         });
//     }
// }


// module.exports={paymentController};

const stripe = require("../../helpers/Stripe");
const User = require("../../models/User");
const Order = require("../../models/Orders");
const Address = require("../../models/Address");

const paymentController = async (req, res) => {
  try {
    // console.log("Payment request received");
    // console.log("User from auth middleware:", req.user);
    
    // Ensure user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in."
      });
    }
    
    const { cartItems, addressId } = req.body;
    console.log("Request body:", { 
      cartItems: !!cartItems, 
      addressId,
      addressIdType: typeof addressId,
      addressIdValue: JSON.stringify(addressId)
    });
    
    // Validate cartItems format
    if (!cartItems || !cartItems.items || !cartItems.userId) {
      return res.status(400).json({
        success: false,
        message: "Invalid cart items or userId",
      });
    }

    // Ensure the authenticated user matches the cart user
    if (req.user.id !== cartItems.userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: User ID mismatch"
      });
    }

    // Look for the user
    const user = await User.findOne({ _id: cartItems.userId });
    console.log("User email:", user ? user.email : "User not found");
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Extract address information
    let addressInfo = {
      addressId: '',
      address: 'Default Address',
      city: 'Default City',
      state: 'Default State',
      country: 'Default Country',
      pincode: '000000',
      phone: '0000000000'
    };
    
    let addressIdForMetadata = '';
    
    if (addressId) {
      try {
        console.log('Processing address:', addressId);
        
        // Check if addressId is an object with address details
        if (typeof addressId === 'object' && addressId !== null) {
          console.log('Address is an object with properties:', Object.keys(addressId));
          
          // Use the address object directly
          addressInfo = {
            addressId: addressId._id || '',
            address: addressId.address || 'Default Address',
            city: addressId.city || 'Default City',
            state: addressId.state || 'Default State',
            country: addressId.country || 'Default Country',
            pincode: addressId.pincode || '000000',
            phone: addressId.phone || '0000000000'
          };
          
          // Use the ID for metadata if available
          addressIdForMetadata = addressId._id ? addressId._id.toString() : '';
          
          console.log('Using address info from object:', addressInfo);
        } 
        // If it's a string that might be JSON
        else if (typeof addressId === 'string') {
          // Check if it's a JSON string
          if (addressId.startsWith('{') && addressId.endsWith('}')) {
            try {
              const parsedAddress = JSON.parse(addressId);
              console.log('Successfully parsed address from JSON string:', parsedAddress);
              
              addressInfo = {
                addressId: parsedAddress._id || '',
                address: parsedAddress.address || 'Default Address',
                city: parsedAddress.city || 'Default City',
                state: parsedAddress.state || 'Default State',
                country: parsedAddress.country || 'Default Country',
                pincode: parsedAddress.pincode || '000000',
                phone: parsedAddress.phone || '0000000000'
              };
              
              addressIdForMetadata = parsedAddress._id ? parsedAddress._id.toString() : '';
            } catch (parseError) {
              console.error('Failed to parse address JSON:', parseError);
            }
          }
          // If it's a string ID and not "[object Object]", look it up in the database
          else if (addressId !== '[object Object]') {
            console.log('Looking up address by ID:', addressId);
            const address = await Address.findById(addressId);
            
            if (address) {
              addressInfo = {
                addressId: addressId,
                address: address.address || 'Default Address',
                city: address.city || 'Default City',
                state: address.state || 'Default State',
                country: address.country || 'Default Country',
                pincode: address.pincode || '000000',
                phone: address.phone || '0000000000'
              };
              
              addressIdForMetadata = addressId;
              console.log('Found address in database:', addressInfo);
            } else {
              console.log('Address not found with ID:', addressId);
            }
          } else {
            console.log('Using default address info - invalid address format');
          }
        } else {
          console.log('Using default address info - unsupported address type');
        }
      } catch (error) {
        console.error('Error processing address:', error);
        console.log('Using default address info due to error');
      }
    }

    // Create a temporary order to store cart items
    const tempOrder = await Order.create({
      userId: cartItems.userId,
      cartItems: cartItems.items.map(item => ({
        productId: item.productId,
        title: item.title,
        image: item.image,
        price: item.salePrice ? item.salePrice.toString() : item.price.toString(),
        quantity: item.quantity
      })),
      orderStatus: 'pending',
      addressInfo: addressInfo, // Add address info directly when creating the order
      totalAmount: cartItems.items.reduce((total, item) => {
        const itemPrice = item.salePrice !== null ? item.salePrice : item.price;
        return total + (item.quantity * itemPrice);
      }, 0)
    });
    
    console.log("Created temporary order:", tempOrder);
    console.log("Order has address info:", !!tempOrder.addressInfo);
    console.log("Address info in order:", tempOrder.addressInfo);

    // Prepare the line_items for Stripe
    const lineItems = cartItems.items.map((item) => {
      return {
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.title,
            images: [item.image],
            metadata: {
              productId: item.productId,
            }
          },
          unit_amount: item.salePrice !== null ? item.salePrice*100 : item.price*100, // convert to cents
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: item.quantity,
      };
    });

    // Set up the Stripe Checkout session parameters
    const params = {
      payment_method_types: ['card'],
      mode: 'payment',
      billing_address_collection: 'auto',
      customer_email: user.email,
      line_items: lineItems,
      success_url: `${process.env.CLIENT_BASE_URL || 'http://localhost:5173'}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_BASE_URL || 'http://localhost:5173'}/shop/cancel`,
      metadata: {
        userId: cartItems.userId,
        tempOrderId: tempOrder._id.toString(),
        addressId: addressIdForMetadata
      },
      payment_intent_data: {
        metadata: {
          userId: cartItems.userId,
          tempOrderId: tempOrder._id.toString(),
          addressId: addressIdForMetadata
        }
      }
    };

    console.log('Creating Stripe session with metadata:', {
      userId: cartItems.userId,
      tempOrderId: tempOrder._id.toString(),
      addressId: addressIdForMetadata
    });

    // Create the session with Stripe
    const session = await stripe.checkout.sessions.create(params);
    console.log('Created Stripe session with ID:', session.id);
    console.log('Payment intent ID:', session.payment_intent);
    console.log('Session metadata:', session.metadata);

    // Update the temporary order with the session ID
    await Order.findByIdAndUpdate(
      tempOrder._id,
      {
        paymentId: session.payment_intent || session.id
      }
    );

    // Send the session response back
    res.status(200).json({
        data: session
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while processing payment",
      error: error.message,
    });
  }
};

module.exports = paymentController;
