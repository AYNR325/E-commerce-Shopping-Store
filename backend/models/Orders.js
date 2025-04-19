const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  cartItems: [{
    productId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  addressInfo: {
    addressId: String,
    address: String,
    city: String,
    state: String,
    country: String,
    pincode: String,
    phone: String
  },
  orderStatus: {
    type: String,
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    default: 'card'
  },
  paymentStatus: {
    type: String,
    default: 'pending'
  },
  totalAmount: {
    type: Number,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  orderUpdateDate: {
    type: Date,
    default: Date.now
  },
  paymentId: String
}, {
  timestamps: true
});

module.exports = mongoose.model("Order", OrderSchema);
