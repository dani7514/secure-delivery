const express = require('express');
const request = require('supertest');
const router = require('../../routes/paymentRoutes');
const paymentController = require('../../controllers/paymentController');

jest.mock('../../controllers/paymentController');

const app = express();
app.use('/', router);

describe('Payment Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /payment', () => {
    it('should call paymentController.postPayment', async () => {
      await request(app).post('/payment');
      expect(paymentController.postPayment).toHaveBeenCalledWith(expect.any(Object), expect.any(Object), expect.any(Function));
    });
  });

  describe('POST /paymentStatus', () => {
    it('should call paymentController.checkPaymentStatus', async () => {
      await request(app).post('/paymentStatus');
      expect(paymentController.checkPaymentStatus).toHaveBeenCalledWith(expect.any(Object), expect.any(Object));
    });
  });
});
