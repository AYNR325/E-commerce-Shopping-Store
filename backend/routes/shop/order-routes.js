const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/orders/orderController');
const paymentController = require('../../controllers/orders/paymentController');
const webhookController = require('../../controllers/orders/webhookController');
const { authMiddleware } = require('../../controllers/auth/auth-controller');
const adminMiddleware = require('../../middleware/adminMiddleware');

// Customer routes - specific routes first
router.get('/all', authMiddleware, adminMiddleware, orderController.getAllOrders);
router.get('/get/:userId', authMiddleware, orderController.getUserOrders);
router.get('/session/:sessionId', authMiddleware, orderController.getOrderBySession);
router.post('/checkout', authMiddleware, paymentController);

// Webhook route doesn't need auth middleware
router.post('/webhook', express.raw({ type: 'application/json' }), webhookController);

// Admin routes
router.get('/all', authMiddleware, adminMiddleware, orderController.getAllOrders);
router.put('/:orderId/status', authMiddleware, adminMiddleware, orderController.updateOrderStatus);
router.put('/:orderId/payment-status', authMiddleware, adminMiddleware, orderController.updatePaymentStatus);

// Generic route last
router.get('/:orderId', authMiddleware, orderController.getOrderDetails);

module.exports = router;