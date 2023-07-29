const express = require('express');
const request = require('supertest');
const router = require('../../routes/orderRoutes');
const orderController = require('../../controllers/orderController');
const authMiddleware = require('../../middleware/authMiddleware');

jest.mock('../../controllers/orderController');
jest.mock('../../middleware/checkAuth');

const app = express();
app.use('/', router);

describe('Order Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /orders/create', () => {
    it('should call orderController.createOrder', async () => {
      await request(app).post('/orders/create');
      expect(authMiddleware).toHaveBeenCalled();
      expect(orderController.createOrder).toHaveBeenCalledWith(expect.any(Object), expect.any(Object));
    });
  });

  describe('GET /orders', () => {
    it('should call orderController.getOrders', async () => {
      await request(app).get('/orders');
      expect(authMiddleware).toHaveBeenCalled();
      expect(orderController.getOrders).toHaveBeenCalledWith(expect.any(Object), expect.any(Object));
    });
  });

  describe('GET /orders/newOrderFromCurrentUser', () => {
    it('should call orderController.getUserRecentOrder', async () => {
      await request(app).get('/orders/newOrderFromCurrentUser');
      expect(authMiddleware).toHaveBeenCalled();
      expect(orderController.getUserRecentOrder).toHaveBeenCalledWith(expect.any(Object), expect.any(Object));
    });
  });

  describe('POST /pay', () => {
    it('should call orderController.postPay', async () => {
      await request(app).post('/pay');
      expect(authMiddleware).toHaveBeenCalled();
      expect(orderController.postPay).toHaveBeenCalledWith(expect.any(Object), expect.any(Object));
    });
  });
});
