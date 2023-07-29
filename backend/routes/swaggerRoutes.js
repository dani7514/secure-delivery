const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const router = express.Router();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Gorana Food Delivery Web App API',
      version: '1.0.0',
      description: 'Gorana Food Delivery Web App API documentation',
    },
  },
  apis: ['./routes/*'], // Specify the file(s) where your JSDoc annotations are present
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerSpec));

module.exports = router;
