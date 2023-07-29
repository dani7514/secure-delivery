const express = require('express');
const request = require('supertest');
const router = require('../../routes/authRoutes');
const authController = require('../../controllers/authController');

jest.mock('../../controllers/authController');

const app = express();
app.use('/', router);

describe('Auth Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /users/seed', () => {
    it('should call authController.seedUsers', async () => {
      await request(app).get('/users/seed');
      expect(authController.seedUsers).toHaveBeenCalled();
    });
  });

  describe('POST /users/register', () => {
    it('should call authController.registerUser', async () => {
      await request(app).post('/users/register');
      expect(authController.registerUser).toHaveBeenCalled();
    });
  });

  describe('POST /users/login', () => {
    it('should call authController.loginUser', async () => {
      await request(app).post('/users/login');
      expect(authController.loginUser).toHaveBeenCalled();
    });
  });

  describe('POST /users/verify', () => {
    it('should call authController.verifyOTP', async () => {
      await request(app).post('/users/verify');
      expect(authController.verifyOTP).toHaveBeenCalled();
    });
  });

  describe('POST /user/:id', () => {
    it('should call authController.storeCartData', async () => {
      await request(app).post('/user/123');
      expect(authController.storeCartData).toHaveBeenCalled();
    });
  });

  describe('GET /cart', () => {
    it('should call authController.getCartData', async () => {
      await request(app).get('/cart');
      expect(authController.getCartData).toHaveBeenCalled();
    });
  });

  describe('GET /profile', () => {
    it('should call authController.getProfile', async () => {
      await request(app).get('/profile');
      expect(authController.getProfile).toHaveBeenCalled();
    });
  });
});
