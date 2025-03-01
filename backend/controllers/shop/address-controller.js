const Address = require("../../models/Address");

const addNewAddress = async (req, res) => {
  try {
    const { userId, address, city, state, country, pincode, phone } = req.body;
console.log(req.body);
    if (
      !userId ||
      !address ||
      !city ||
      !state ||
      !country ||
      !pincode ||
      !phone
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const newlyCreatedAddress = new Address({
      userId,
      address,
      city,
      state,
      country,
      pincode,
      phone,
    });

    await newlyCreatedAddress.save();

    res.status(201).json({
      success: true,
      data: newlyCreatedAddress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const fetchAllAddresses = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is required!",
      });
    }

    const addressList = await Address.find({ userId });
    res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const updateAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const { address, city, state, country, pincode, phone } = req.body;
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User id or address id is required!",
      });
    }
    const updatedAddress = await Address.findOneAndUpdate(
      { userId, _id: addressId },
      { address, city, state, country, pincode, phone },
      { new: true }
    );
    if (!updatedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found!",
      });
    }
    res.status(200).json({
      success: true,
      data: updatedAddress,
    });
    console.log(updatedAddress);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    console.log(req.params);
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User id or address id is required!",
      });
    }
    const deletedAddress = await Address.findOneAndDelete({
      userId,
      _id: addressId,
    });
    if (!deletedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Address deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = {
  addNewAddress,
  fetchAllAddresses,
  updateAddress,
  deleteAddress,
};
