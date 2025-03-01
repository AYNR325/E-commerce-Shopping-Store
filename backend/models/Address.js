const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    userId: String,
    address: String,
    city: String,
    state: String,
    country: String,
    pincode: String,
    phone: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
