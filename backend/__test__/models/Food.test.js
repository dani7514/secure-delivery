require('dotenv').config({ path: './config.env' });

const mongoose = require('mongoose');
const { foodSchema, foodModel } = require('../../models/Food');
describe('Food Model', () => {
  let food;

  beforeAll(() => {
    const url = process.env.MONGO_TEST_URI;
    return mongoose.connect(url);
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  beforeEach(() => {
    food = new foodModel({
      name: 'Food 1',
      price: 10,
      tags: ['tag1', 'tag2'],
      favorite: true,
      imageUrl: 'https://example.com/food1.jpg',
      star: 4.5,
      origins: ['origin1', 'origin2'],
      cookTime: '30 minutes',
    });
  });

  afterEach(async () => {
    await foodModel.deleteMany();
  });

  test('should save a food document correctly', async () => {
    const savedFood = await food.save();

    expect(savedFood._id).toBeDefined();
    expect(savedFood.name).toBe(food.name);
    expect(savedFood.price).toBe(food.price);
    expect(savedFood.tags).toEqual(food.tags);
    expect(savedFood.favorite).toBe(food.favorite);
    expect(savedFood.imageUrl).toBe(food.imageUrl);
    expect(savedFood.star).toBe(food.star);
    expect(savedFood.origins).toEqual(food.origins);
    expect(savedFood.cookTime).toBe(food.cookTime);
    expect(savedFood.createdAt).toBeDefined();
    expect(savedFood.updatedAt).toBeDefined();
  });

  test('should require the name field', async () => {
    delete food.name;

    let error;
    try {
      await food.save();
    } catch (err) {
      error = err;
    }

    expect(error);
  });

  test('should require the price field', async () => {
    delete food.price;

    let error;
    try {
      await food.save();
    } catch (err) {
      error = err;
    }

    expect(error);
  });

  test('should require the tags field', async () => {
    delete food.tags;

    let error;
    try {
      await food.save();
    } catch (err) {
      error = err;
    }

    expect(error);
  });

  test('should require the imageUrl field', async () => {
    delete food.imageUrl;

    let error;
    try {
      await food.save();
    } catch (err) {
      error = err;
    }

    expect(error);
  });

  test('should require the star field', async () => {
    delete food.star;

    let error;
    try {
      await food.save();
    } catch (err) {
      error = err;
    }

    expect(error);
  });

  test('should require the origins field', async () => {
    delete food.origins;

    let error;
    try {
      await food.save();
    } catch (err) {
      error = err;
    }

    expect(error);
  });

  test('should require the cookTime field', async () => {
    delete food.cookTime;

    let error;
    try {
      await food.save();
    } catch (err) {
      error = err;
    }

    expect(error);
  });
});
