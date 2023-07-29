const router = require('express').Router();
const foodController = require('../controllers/foodController');

/**
 * @swagger
 * /foods/seed:
 *   get:
 *     summary: Seed foods
 *     description: Seeds the database with food data if it's not already seeded.
 *     responses:
 *       200:
 *         description: Seed is done!
 *       400:
 *         description: Seed is already done!
 */
router.get("/foods/seed", foodController.seedDocuments);

/**
 * @swagger
 * /foods:
 *   get:
 *     summary: Get all foods
 *     description: Retrieves all food data.
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Error retrieving food data
 */
router.get('/foods', foodController.getFoods);

/**
 * @swagger
 * /foods/search/{searchTerm}:
 *   get:
 *     summary: Search foods
 *     description: Searches for foods based on the provided search term.
 *     parameters:
 *       - in: path
 *         name: searchTerm
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.get('/foods/search/:searchTerm', foodController.searchFoods);

/**
 * @swagger
 * /foods/{foodId}:
 *   get:
 *     summary: Get food by ID
 *     description: Retrieves food data based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: foodId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.get('/foods/:foodId', foodController.getFood);

/**
 * @swagger
 * /foods/create:
 *   post:
 *     summary: Create food
 *     description: Creates a new food entry.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define properties of the food object here
 *     responses:
 *       201:
 *         description: Food created successfully
 *       400:
 *         description: Error creating food
 */
router.post('/foods/create', foodController.createFood);

module.exports = router;