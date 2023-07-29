const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

router.use(auth);

/**
 * @swagger
 * /orders/create:
 *   post:
 *     summary: Create order
 *     description: Creates a new order for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define properties of the order object here
 *     responses:
 *       200:
 *         description: Order created successfully
 *       400:
 *         description: Error creating order or cart is empty
 */
router.post('/orders/create', orderController.createOrder);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get user orders
 *     description: Retrieves all orders for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.get('/orders', orderController.getOrders);

/**
 * @swagger
 * /orders/newOrderFromCurrentUser:
 *   get:
 *     summary: Get new order from current user
 *     description: Retrieves the new order for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: New order not found
 */
router.get('/orders/newOrderFromCurrentUser', orderController.getUserRecentOrder);

/**
 * @swagger
 * /pay:
 *   post:
 *     summary: Pay for order
 *     description: Updates the payment status of the new order for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentId:
 *                 type: string
 *             required:
 *               - paymentId
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Order not found
 */
router.post('/pay', orderController.postPay);

module.exports = router;


