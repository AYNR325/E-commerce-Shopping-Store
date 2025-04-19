const express = require('express');

const {addToCart, fetchCartItems, updateCartItemQty, deleteCartItem, clearCart} = require("../../controllers/shop/cart-controller");
const { authMiddleware } = require('../../controllers/auth/auth-controller');

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart", updateCartItemQty);
router.delete("/clear/:userId", authMiddleware, clearCart);
router.delete("/:userId/:productId", deleteCartItem);

module.exports = router;