const express = require('express');

const {paymentController}=require("../../controllers/orders/paymentController")
const { createOrder, getAllOrders, orderDetails }= require("../../controllers/shop/order-controller")
const router=express.Router();

router.post("/checkout",paymentController)

router.post("/create", createOrder)

router.get("/get/:userId", getAllOrders)

router.get("/details/:orderId", orderDetails)
module.exports = router;