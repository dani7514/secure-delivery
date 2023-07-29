const express = require('express');
const request = require('supertest');
const router = require('../../routes/foodRoutes');
const foodController = require('../../controllers/foodController');

jest.mock('../../controllers/foodController');

const app = express();
app.use('/', router);

describe('Food Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /foods/seed', () => {
    it('should call foodController.seedDocuments', async () => {
      await request(app).get('/foods/seed');
      expect(foodController.seedDocuments).toHaveBeenCalled();
    });
  });

  describe('GET /foods', () => {
    it('should call foodController.getFoods', async () => {
      await request(app).get('/foods');
      expect(foodController.getFoods).toHaveBeenCalled();
    });
  });

  describe('GET /foods/search/:searchTerm', () => {
    it('should call foodController.searchFoods', async () => {
      await request(app).get('/foods/search/test');
      expect(foodController.searchFoods).toHaveBeenCalledWith(expect.any(Object), expect.any(Object));
    });
  });

  describe('GET /foods/:foodId', () => {
    it('should call foodController.getFood', async () => {
      await request(app).get('/foods/123');
      expect(foodController.getFood).toHaveBeenCalledWith(expect.any(Object), expect.any(Object));
    });
  });

  describe('POST /foods/create', () => {
    it('should call foodController.createFood', async () => {
      await request(app).post('/foods/create');
      expect(foodController.createFood).toHaveBeenCalledWith(expect.any(Object), expect.any(Object));
    });
  });
});
