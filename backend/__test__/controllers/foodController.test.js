const foodService = require('../../services/foodService');
const foodController = require('../../controllers/foodController');

jest.mock('../../services/foodService');

describe('Food Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      send: jest.fn(),
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('seedDocuments', () => {
    it('should seed documents and send the result', async () => {
      const expectedResult = { success: true };
      foodService.seedDocuments.mockResolvedValue(expectedResult);

      await foodController.seedDocuments(req, res);

      expect(foodService.seedDocuments).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith(expectedResult);
    });

    it('should handle errors and send a 500 status with the error message', async () => {
      const errorMessage = 'Internal Server Error';
      foodService.seedDocuments.mockRejectedValue(new Error(errorMessage));

      await foodController.seedDocuments(req, res);

      expect(foodService.seedDocuments).toHaveBeenCalled();
      expect(console.log);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send);
    });
  });

  describe('getFoods', () => {
    it('should get foods and send them as JSON', async () => {
      const foods = [{ name: 'Food 1' }, { name: 'Food 2' }];
      foodService.getFoods.mockResolvedValue(foods);

      await foodController.getFoods(req, res);

      expect(foodService.getFoods).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(foods);
    });

    it('should handle errors and send a 400 status with the error message', async () => {
      const errorMessage = 'Bad Request';
      foodService.getFoods.mockRejectedValue(new Error(errorMessage));

      await foodController.getFoods(req, res);

      expect(foodService.getFoods).toHaveBeenCalled();
      expect(console.log);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send);
    });
  });

  describe('searchFoods', () => {
    it('should search foods and send the result', async () => {
      const searchTerm = 'apple';
      const foods = [{ name: 'Apple' }, { name: 'Pineapple' }];
      foodService.searchFoods.mockResolvedValue(foods);

      req.params = { searchTerm };

      await foodController.searchFoods(req, res);

      expect(foodService.searchFoods).toHaveBeenCalledWith(searchTerm);
      expect(res.send).toHaveBeenCalledWith(foods);
    });

    it('should handle errors and send a 400 status with the error message', async () => {
      const searchTerm = 'apple';
      const errorMessage = 'Bad Request';
      foodService.searchFoods.mockRejectedValue(new Error(errorMessage));

      req.params = { searchTerm };

      await foodController.searchFoods(req, res);

      expect(foodService.searchFoods).toHaveBeenCalledWith(searchTerm);
      expect(console.log);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send);
    });
  });

  describe('getFood', () => {
    it('should get a food by ID and send the result', async () => {
      const foodId = 'foodId';
      const food = { name: 'Food' };
      foodService.getFood.mockResolvedValue(food);

      req.params = { foodId };

      await foodController.getFood(req, res);

      expect(foodService.getFood).toHaveBeenCalledWith(foodId);
      expect(res.send).toHaveBeenCalledWith(food);
    });

    it('should handle errors and send a 400 status with the error message', async () => {
      const foodId = 'foodId';
      const errorMessage = 'Bad Request';
      foodService.getFood.mockRejectedValue(new Error(errorMessage));

      req.params = { foodId };

      await foodController.getFood(req, res);

      expect(foodService.getFood).toHaveBeenCalledWith(foodId);
      expect(console.log);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send);
    });
  });

  describe('createFood', () => {
    it('should create a new food and send it with a 201 status', async () => {
      const newFood = { name: 'New Food' };
      const createdFood = { ...newFood, _id: 'foodId' };
      foodService.createFood.mockResolvedValue(createdFood);

      req.body = newFood;

      await foodController.createFood(req, res);

      expect(foodService.createFood).toHaveBeenCalledWith(newFood);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(createdFood);
    });

    it('should handle errors and send a 400 status with the error message', async () => {
      const newFood = { name: 'New Food' };
      const errorMessage = 'Bad Request';
      foodService.createFood.mockRejectedValue(new Error(errorMessage));

      req.body = newFood;

      await foodController.createFood(req, res);

      expect(foodService.createFood).toHaveBeenCalledWith(newFood);
      expect(console.log);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send);
    });
  });
});
