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

const paymentController = async (req, res) => {
  try {
    const { cartItems } = req.body;
    console.log(cartItems ,"cartitems");
    // Validate cartItems format
    if (!cartItems || !cartItems.items || !cartItems.userId) {
      return res.status(400).json({
        success: false,
        message: "Invalid cart items or userId",
      });
    }

    // Look for the user
    const user = await User.findOne({ _id: cartItems.userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log(`User email: ${user.email}`);
    
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
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      customer_email: user.email,
      line_items: lineItems,
      success_url: 'http://localhost:5173/shop/success',
      cancel_url: 'http://localhost:5173/shop/cancel',
    };

    // Create the session with Stripe
    const session = await stripe.checkout.sessions.create(params);
    console.log(session,"session");

    // Send the session response back
    res.status(200).json({
        // url: session.url
        data: session
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while processing payment",
      error: error.message, // Include error message for debugging
    });
  }
};

module.exports = { paymentController };
