const Order = require('../../models/Orders');

// Get all orders (admin function)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    
    return res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    console.error('Error fetching all orders:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch orders'
    });
  }
};

// Get orders by user ID
const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }
    
    const orders = await Order.find({ userId }).sort({ orderDate: -1 });
    
    return res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch orders'
    });
  }
};

// Get order details by ID
const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Order ID is required'
      });
    }
    
    const order = await Order.findById(orderId);
    console.log("Order found:", order ? "Yes" : "No");
    
    if (order) {
      console.log("Order details:", {
        id: order._id,
        userId: order.userId,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
        hasAddressInfo: !!order.addressInfo,
        addressInfoDetails: order.addressInfo
      });
      
      // Ensure addressInfo is always an object with default values
      if (!order.addressInfo) {
        order.addressInfo = {
          addressId: '',
          address: 'Default Address',
          city: 'Default City',
          state: 'Default State',
          country: 'Default Country',
          pincode: '000000',
          phone: '0000000000'
        };
        console.log("Added default addressInfo object to order");
      }
      
      // Save the updated order with address info if it was missing
      if (!order.addressInfo || Object.keys(order.addressInfo).length === 0) {
        await Order.findByIdAndUpdate(orderId, { 
          addressInfo: order.addressInfo 
        });
        console.log("Saved default address info to order");
      }
    }
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Error fetching order details:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch order details'
    });
  }
};

// Update order status (admin function)
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;
    console.log('Updating order status:', orderId, orderStatus);
    // Validate input
    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Order ID is required'
      });
    }
    
    if (!orderStatus) {
      return res.status(400).json({
        success: false,
        message: 'Order status is required'
      });
    }
    
    // Validate status value
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }
    
    // Find and update the order
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { 
        orderStatus,
        orderUpdateDate: new Date()
      },
      { new: true }
    );
    
    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    console.log(`Order ${orderId} status updated to ${orderStatus}`);
    
    return res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      order: updatedOrder
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update order status'
    });
  }
};

// Get order by session ID
const getOrderBySession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    console.log('Fetching order by session ID:', sessionId);
    
    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required'
      });
    }
    
    // Find the order with the matching session ID
    const order = await Order.findOne({ 
      paymentId: sessionId 
    });
    
    console.log('Order found:', order ? 'Yes' : 'No');
    
    if (!order) {
      // Try to find by temporary order ID (which might be stored in metadata)
      const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      
      console.log('Stripe session retrieved:', session ? 'Yes' : 'No');
      console.log('Session metadata:', session?.metadata);
      
      if (session && session.metadata && session.metadata.tempOrderId) {
        const tempOrder = await Order.findById(session.metadata.tempOrderId);
        
        if (tempOrder) {
          console.log('Found order by tempOrderId:', tempOrder._id);
          
          // If payment is successful but status is still pending, update it
          if (session.payment_status === 'paid' && tempOrder.paymentStatus === 'pending') {
            console.log('Payment is successful but status is pending. Updating to completed.');
            
            const updatedOrder = await Order.findByIdAndUpdate(
              tempOrder._id,
              {
                paymentStatus: 'completed',
                orderStatus: 'processing',
                orderUpdateDate: new Date(),
                paymentId: session.payment_intent || session.id
              },
              { new: true }
            );
            
            return res.status(200).json({
              success: true,
              order: updatedOrder
            });
          }
          
          return res.status(200).json({
            success: true,
            order: tempOrder
          });
        }
      }
      
      return res.status(404).json({
        success: false,
        message: 'Order not found for this session'
      });
    }
    
    // If payment is successful but status is still pending, update it
    if (order.paymentStatus === 'pending') {
      const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      
      if (session && session.payment_status === 'paid') {
        console.log('Payment is successful but status is pending. Updating to completed.');
        
        const updatedOrder = await Order.findByIdAndUpdate(
          order._id,
          {
            paymentStatus: 'completed',
            orderStatus: 'processing',
            orderUpdateDate: new Date()
          },
          { new: true }
        );
        
        return res.status(200).json({
          success: true,
          order: updatedOrder
        });
      }
    }
    
    return res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Error fetching order by session:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch order details'
    });
  }
};

// Update payment status
const updatePaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentStatus } = req.body;
    
    // Validate input
    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Order ID is required'
      });
    }
    
    if (!paymentStatus) {
      return res.status(400).json({
        success: false,
        message: 'Payment status is required'
      });
    }
    
    // Validate status value
    const validStatuses = ['pending', 'processing', 'completed', 'failed', 'refunded'];
    if (!validStatuses.includes(paymentStatus)) {
      return res.status(400).json({
        success: false,
        message: `Invalid payment status. Must be one of: ${validStatuses.join(', ')}`
      });
    }
    
    // Find and update the order
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { 
        paymentStatus,
        orderUpdateDate: new Date()
      },
      { new: true }
    );
    
    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    console.log(`Order ${orderId} payment status updated to ${paymentStatus}`);
    
    return res.status(200).json({
      success: true,
      message: 'Payment status updated successfully',
      order: updatedOrder
    });
  } catch (error) {
    console.error('Error updating payment status:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update payment status'
    });
  }
};

module.exports = {
  getAllOrders,
  getUserOrders,
  getOrderDetails,
  updateOrderStatus,
  getOrderBySession,
  updatePaymentStatus
}; 