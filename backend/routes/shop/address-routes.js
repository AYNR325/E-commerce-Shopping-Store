const express=require('express');

const {addNewAddress,fetchAllAddresses,updateAddress,deleteAddress}=require('../../controllers/shop/address-controller');

const router=express.Router();

router.post("/add",addNewAddress);

router.get("/get/:userId",fetchAllAddresses);

router.put("/update/:userId/:addressId",updateAddress);

router.delete("/delete/:userId/:addressId",deleteAddress);

module.exports = router;

