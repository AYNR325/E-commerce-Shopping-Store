const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orders/orderController');
const paymentController = require('../controllers/orders/paymentController');
const webhookController = require('../controllers/orders/webhookController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Customer routes
router.get('/get/:userId', authMiddleware, orderController.getUserOrders);
router.get('/session/:sessionId', authMiddleware, orderController.getOrderBySession);
router.get('/:orderId', authMiddleware, orderController.getOrderDetails);
router.post('/checkout', authMiddleware, paymentController);
router.post('/webhook', webhookController);

// Admin routes
router.get('/all', authMiddleware, adminMiddleware, orderController.getAllOrders);
router.put('/:orderId/status', authMiddleware, adminMiddleware, orderController.updateOrderStatus);

module.exports = router; 