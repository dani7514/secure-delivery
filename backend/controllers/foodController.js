const foodService = require('../services/foodService');

exports.seedDocuments = async (req, res) => {
  try {
    const result = await foodService.seedDocuments();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.getFoods = async (req, res) => {
  try {
    const foods = await foodService.getFoods();
    res.json(foods);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.searchFoods = async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;
    const foods = await foodService.searchFoods(searchTerm);
    res.send(foods);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.getFood = async (req, res) => {
  try {
    const foodId = req.params.foodId;
    const food = await foodService.getFood(foodId);
    res.send(food);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.createFood = async (req, res) => {
  try {
    const newFood = req.body;
    const food = await foodService.createFood(newFood);
    res.status(201).send(food);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
