const Order = require("../../models/Orders");
const Cart = require("../../models/Cart");
const createOrder = async (req, res) => {
  try {
    const { orderData } = req.body;
    const { userId } = orderData;
    const saveNewOrder = await Order.create(orderData);

    if (saveNewOrder) {
      await Cart.deleteMany({ userId: userId });
      res.status(200).json({
        success: true,
        message: "Order placed successfully!",
        orderId: saveNewOrder._id,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const extractAllOrders = await Order.find({ userId: id }).populate(
      "cartItems"
    );

    if (extractAllOrders) {
      res.status(200).json({
        success: true,
        data: extractAllOrders,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const orderDetails = async (req, res) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Order id is required!",
      });
    }
    const extractOrderDetails = await Order.findById(id).populate("cartItems");

    if (extractOrderDetails) {
      res.status(200).json({
        success: true,
        data: extractOrderDetails,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = { createOrder, getAllOrders, orderDetails };