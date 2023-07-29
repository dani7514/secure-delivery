const seedData = require('../seedData/data');
const foodModel = require('../models/Food').foodModel;

exports.seedDocuments = async () => {
  const foodCount = await foodModel.countDocuments();
  if (foodCount > 0) {
    return "Seed is already done!";
  }
  await foodModel.create(seedData.food);
  return "Seed is done!";
};

exports.getFoods = async () => {
  return await foodModel.find();
};

exports.searchFoods = async (searchTerm) => {
  const regex = new RegExp(searchTerm, 'i');
  return await foodModel.find({name: regex});
};

exports.getFood = async (foodId) => {
  return await foodModel.findById(foodId);
};

exports.createFood = async (newFood) => {
  return await foodModel.create(newFood);
};
