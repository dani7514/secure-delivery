const foodService = require('../../services/foodService');
const foodModel = require('../../models/Food').foodModel;
const seedData = require('../../seedData/data');

jest.mock('../../models/Food');

describe('foodService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('seedDocuments', () => {
    test('should return "Seed is already done!" if documents already exist', async () => {
      foodModel.countDocuments.mockResolvedValueOnce(1);

      const result = await foodService.seedDocuments();

      expect(foodModel.countDocuments).toHaveBeenCalled();
      expect(result).toBe('Seed is already done!');
    });

    test('should create and return documents if none exist', async () => {
      foodModel.countDocuments.mockResolvedValueOnce(0);
      foodModel.create.mockResolvedValueOnce('createdDocuments');

      const result = await foodService.seedDocuments();

      expect(foodModel.countDocuments).toHaveBeenCalled();
      expect(foodModel.create).toHaveBeenCalledWith(seedData.food);
      expect(result).toBe('Seed is done!');
    });
  });

  describe('getFoods', () => {
    test('should return an array of foods', async () => {
      const foods = [{ name: 'Food 1' }, { name: 'Food 2' }];
      foodModel.find.mockResolvedValueOnce(foods);

      const result = await foodService.getFoods();

      expect(foodModel.find).toHaveBeenCalled();
      expect(result).toEqual(foods);
    });
  });

  describe('searchFoods', () => {
    test('should return an array of foods that match the search term', async () => {
      const searchTerm = 'pizza';
      const foods = [{ name: 'Pizza 1' }, { name: 'Pizza 2' }];
      foodModel.find.mockResolvedValueOnce(foods);

      const result = await foodService.searchFoods(searchTerm);

      expect(foodModel.find).toHaveBeenCalledWith({ name: expect.any(RegExp) });
      expect(result).toEqual(foods);
    });
  });

  describe('getFood', () => {
    test('should return a food by its ID', async () => {
      const foodId = '123';
      const food = { _id: foodId, name: 'Food 1' };
      foodModel.findById.mockResolvedValueOnce(food);

      const result = await foodService.getFood(foodId);

      expect(foodModel.findById).toHaveBeenCalledWith(foodId);
      expect(result).toEqual(food);
    });
  });

  describe('createFood', () => {
    test('should create and return a new food', async () => {
      const newFood = { name: 'New Food' };
      const createdFood = { _id: '456', ...newFood };
      foodModel.create.mockResolvedValueOnce(createdFood);

      const result = await foodService.createFood(newFood);

      expect(foodModel.create).toHaveBeenCalledWith(newFood);
      expect(result).toEqual(createdFood);
    });
  });
});
