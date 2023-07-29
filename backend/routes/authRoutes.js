require('dotenv').config({path: './config.env'})
const router = require('express').Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * /users/seed:
 *   get:
 *     summary: Seed users
 *     description: Seeds the database with user data if it's not already seeded.
 *     responses:
 *       200:
 *         description: Seed is done!
 *       400:
 *         description: Seed is already done!
 */
router.get("/users/seed", authController.seedUsers);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register user
 *     description: Registers a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: User is already exist, please login!
 */
router.post('/users/register', authController.registerUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and generates an OTP for verification.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: Credentials are not valid
 */
router.post('/users/login', authController.loginUser);

/**
 * @swagger
 * /users/verify:
 *   post:
 *     summary: Verify OTP
 *     description: Verifies the OTP sent to the user during the login process.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: OTP is not valid
 */
router.post('/users/verify', authController.verifyOTP);

/**
 * @swagger
 * /user/{id}:
 *   post:
 *     summary: Store cart data
 *     description: Stores the cart data for a user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cart:
 *                 type: array
 *     responses:
 *       200:
 *         description: Cart data stored successfully
 */
router.post('/user/:id', authController.storeCartData);

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get user cart
 *     description: Retrieves the cart data for a user.
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.get('/cart', authController.getCartData);

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieves the profile data for an authenticated user.
 *     responses:
 *       200:
 *         description: Successful operation
 *       401:
 *         description: Authorization token is missing or invalid
 */
router.get('/profile', authController.getProfile);

module.exports = router;