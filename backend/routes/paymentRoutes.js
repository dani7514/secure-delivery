const router = require("express").Router();
const paymentController = require('../controllers/paymentController');

/**
 * @swagger
 * /payment:
 *   post:
 *     summary: Process payment
 *     description: Creates a new payment session for the provided items.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     food:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         price:
 *                           type: number
 *                     quantity:
 *                       type: number
 *             required:
 *               - items
 *     responses:
 *       200:
 *         description: Payment session created successfully
 */
router.post('/payment', paymentController.postPayment);

/**
 * @swagger
 * /paymentStatus:
 *   post:
 *     summary: Get payment status
 *     description: Retrieves the payment status for a given checkout ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *             required:
 *               - id
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.post('/paymentStatus', paymentController.checkPaymentStatus);

module.exports = router;
