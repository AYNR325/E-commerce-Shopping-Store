const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../../models/Orders');
const Cart = require('../../models/Cart');
const Address = require('../../models/Address');

const webhookController = async (req, res) => {
  const signature = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log(`Webhook received event type: ${event.type}`);

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Webhook received checkout.session.completed event');
      console.log('Session payment_status:', session.payment_status);
      console.log('Session payment_intent:', session.payment_intent);
      console.log('Session ID:', session.id);
      console.log('Full session object:', JSON.stringify(session, null, 2));
      
      try {
        const { userId, tempOrderId, addressId } = session.metadata;
        console.log('Processing webhook with metadata:', { userId, tempOrderId, addressId });
        console.log('Raw metadata:', session.metadata);
        
        // Find the temporary order
        const tempOrder = await Order.findById(tempOrderId);
        if (!tempOrder) {
          throw new Error('Temporary order not found');
        }
        
        console.log('Found temporary order:', tempOrder._id);
        console.log('Temporary order has address info:', !!tempOrder.addressInfo);
        if (tempOrder.addressInfo) {
          console.log('Existing address info:', tempOrder.addressInfo);
        }
        
        // Get shipping address from database
        let addressInfo = {
          addressId: '',
          address: '',
          city: '',
          state: '',
          country: '',
          pincode: '',
          phone: ''
        };

        // Try to parse addressId if it's a JSON string
        let parsedAddressId = addressId;
        if (addressId && typeof addressId === 'string') {
          try {
            // Check if it's a JSON string
            if (addressId.startsWith('{') || addressId.startsWith('[')) {
              const parsed = JSON.parse(addressId);
              console.log('Successfully parsed address JSON:', parsed);
              
              // If it's a full address object with address fields
              if (parsed.address || parsed.city || parsed.state || parsed.country) {
                addressInfo = {
                  addressId: parsed._id || '',
                  address: parsed.address || '',
                  city: parsed.city || '',
                  state: parsed.state || '',
                  country: parsed.country || '',
                  pincode: parsed.pincode || '',
                  phone: parsed.phone || ''
                };
                console.log('Using address info from parsed JSON:', addressInfo);
                parsedAddressId = parsed._id || parsed.id || parsed;
              } else {
                // Just an ID
                parsedAddressId = parsed._id || parsed.id || parsed;
                console.log('Parsed address ID from JSON:', parsedAddressId);
              }
            }
          } catch (e) {
            console.log('Not a valid JSON string, using as is:', e.message);
          }
        } else if (addressId && typeof addressId === 'object') {
          // If addressId is already an object
          console.log('Address is already an object:', Object.keys(addressId));
          
          if (addressId.address || addressId.city || addressId.state || addressId.country) {
            addressInfo = {
              addressId: addressId._id || '',
              address: addressId.address || '',
              city: addressId.city || '',
              state: addressId.state || '',
              country: addressId.country || '',
              pincode: addressId.pincode || '',
              phone: addressId.phone || ''
            };
            console.log('Using address info from object:', addressInfo);
            parsedAddressId = addressId._id || addressId.id || '';
          }
        }

        // If the order already has address info, use that
        if (tempOrder.addressInfo && 
            (tempOrder.addressInfo.address || 
             tempOrder.addressInfo.city || 
             tempOrder.addressInfo.state || 
             tempOrder.addressInfo.country)) {
          console.log('Using existing address info from order');
          addressInfo = tempOrder.addressInfo;
        }
        // Otherwise try to get it from the addressId in metadata
        else if (parsedAddressId) {
          try {
            console.log('Looking up address with ID:', parsedAddressId);
            const addressFromDb = await Address.findById(parsedAddressId);
            console.log('Found address:', addressFromDb);
            
            if (addressFromDb) {
              addressInfo = {
                addressId: parsedAddressId,
                address: addressFromDb.address || '',
                city: addressFromDb.city || '',
                state: addressFromDb.state || '',
                country: addressFromDb.country || '',
                pincode: addressFromDb.pincode || '',
                phone: addressFromDb.phone || ''
              };
            } else {
              console.log('Address not found in database with ID:', parsedAddressId);
            }
          } catch (error) {
            console.error(`Error fetching address: ${error.message}`);
          }
        } else {
          console.log('No address ID provided in metadata and no existing address info');
        }
        
        // Set payment status based on Stripe session status
        let paymentStatus;
        if (session.payment_status === 'paid') {
          paymentStatus = 'completed';
        } else if (session.payment_status === 'unpaid') {
          paymentStatus = 'failed';
        } else {
          paymentStatus = 'pending';
        }
        console.log('Setting payment status to:', paymentStatus);
        console.log('Address info to be saved:', addressInfo);
        
        // Update the order with final details
        const updateData = {
          $set: {
            orderStatus: paymentStatus === 'completed' ? 'processing' : 'pending',
            paymentMethod: 'card',
            paymentStatus: paymentStatus,
            orderDate: new Date(),
            orderUpdateDate: new Date(),
            paymentId: session.payment_intent || session.id
          },
          $setOnInsert: {
            cartItems: tempOrder.cartItems,
            totalAmount: tempOrder.totalAmount
          }
        };
        
        // Only update addressInfo if it's not already set in the order
        if (!tempOrder.addressInfo || 
            (!tempOrder.addressInfo.address && 
             !tempOrder.addressInfo.city && 
             !tempOrder.addressInfo.state && 
             !tempOrder.addressInfo.country)) {
          updateData.$set.addressInfo = addressInfo;
        }
        
        console.log('Updating order with data:', JSON.stringify(updateData, null, 2));
        
        const updatedOrder = await Order.findByIdAndUpdate(
          tempOrderId,
          updateData,
          { 
            new: true,
            runValidators: true,
            upsert: true
          }
        );

        if (!updatedOrder) {
          throw new Error('Failed to update order');
        }
        
        console.log('Updated order with payment status:', {
          orderId: updatedOrder._id,
          paymentStatus: updatedOrder.paymentStatus,
          orderStatus: updatedOrder.orderStatus
        });
        
        // Verify the update was successful
        const verifyOrder = await Order.findById(tempOrderId);
        console.log('Verified order after update:', {
          orderId: verifyOrder._id,
          paymentStatus: verifyOrder.paymentStatus,
          orderStatus: verifyOrder.orderStatus
        });
        
        // Clear the cart only if payment is completed
        if (paymentStatus === 'completed') {
          await Cart.deleteMany({ userId });
          console.log('Cart cleared for user:', userId);
        }
      } catch (error) {
        console.error(`Error processing order: ${error.message}`);
        console.error(error.stack);
      }
      break;
      
    // Also handle payment_intent.succeeded event which is more reliable for payment completion
    case 'payment_intent.succeeded':
      try {
        const paymentIntent = event.data.object;
        console.log('Payment intent succeeded:', paymentIntent.id);
        
        // Find order with this payment intent ID
        const order = await Order.findOne({ paymentId: paymentIntent.id });
        
        if (order) {
          console.log(`Found order ${order._id} with payment intent ${paymentIntent.id}`);
          
          // Update the payment status to completed
          const updatedOrder = await Order.findByIdAndUpdate(
            order._id,
            {
              $set: {
                paymentStatus: 'completed',
                orderStatus: 'processing',
                orderUpdateDate: new Date()
              }
            },
            { new: true }
          );
          
          console.log('Updated order payment status to completed:', updatedOrder._id);
          
          // Clear the cart
          await Cart.deleteMany({ userId: order.userId });
          console.log('Cart cleared for user:', order.userId);
        } else {
          console.log('No order found with payment intent:', paymentIntent.id);
        }
      } catch (error) {
        console.error(`Error handling payment_intent.succeeded: ${error.message}`);
        console.error(error.stack);
      }
      break;
      
    case 'checkout.session.expired':
      try {
        const { tempOrderId } = event.data.object.metadata;
        if (tempOrderId) {
          await Order.findByIdAndUpdate(tempOrderId, {
            paymentStatus: 'failed',
            orderStatus: 'pending',
            orderUpdateDate: new Date()
          });
          console.log(`Order ${tempOrderId} marked as failed due to session expiration`);
        }
      } catch (error) {
        console.error(`Error handling expired session: ${error.message}`);
      }
      break;
      
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
};

module.exports = webhookController; 