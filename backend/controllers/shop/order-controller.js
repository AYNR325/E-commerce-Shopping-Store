const Order = require("../../models/Orders");
const Cart = require("../../models/Cart");

const createOrder = async (req, res) => {
  try {
    const { userId, sessionId, items } = req.body;
    
    if (!userId || !items || !Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order data. userId and items are required.",
      });
    }
    
    // Calculate totals
    const subtotal = items.reduce((total, item) => {
      const itemPrice = item.salePrice !== null ? item.salePrice : item.price;
      return total + (itemPrice * item.quantity);
    }, 0);
    
    const shippingCost = 0; // You can set your shipping cost logic here
    const totalAmount = subtotal + shippingCost;
    
    // Create order object
    const orderData = {
      userId,
      items,
      paymentInfo: {
        id: sessionId,
        status: 'completed',
        method: 'card',
        amountPaid: totalAmount,
      },
      shippingAddress: req.body.shippingAddress || {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
      },
      subtotal,
      shippingCost,
      totalAmount,
      status: 'processing',
    };
    
    const saveNewOrder = await Order.create(orderData);

    if (saveNewOrder) {
      // Clear the cart
      await Cart.deleteMany({ userId: userId });
      
      res.status(200).json({
        success: true,
        message: "Order placed successfully!",
        orderId: saveNewOrder._id,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to create order.",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
      error: e.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required!",
      });
    }

    const extractAllOrders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: extractAllOrders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
      error: e.message,
    });
  }
};

const orderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required!",
      });
    }
    
    let extractOrderDetails;
    
    // Check if orderId is a valid MongoDB ObjectId
    if (orderId.match(/^[0-9a-fA-F]{24}$/)) {
      // If it's a valid ObjectId, find by _id
      extractOrderDetails = await Order.findById(orderId);
    } else {
      // If it's not a valid ObjectId (like a Stripe session ID), find by paymentInfo.id
      extractOrderDetails = await Order.findOne({ "paymentInfo.id": orderId });
    }

    if (extractOrderDetails) {
      res.status(200).json({
        success: true,
        data: extractOrderDetails,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
      error: e.message,
    });
  }
};

module.exports = { createOrder, getAllOrders, orderDetails };