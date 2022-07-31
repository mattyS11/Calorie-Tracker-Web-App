const asyncHandler = require("express-async-handler");

const Meal = require("../models/mealModel");

const getMeals = asyncHandler(async (req, res) => {
  const meals = await Meal.find();

  res.status(200).json(meals);
});

const getMeal = asyncHandler(async (req, res) => {
  const meal = await Meal.findById(req.params.id);

  res.status(200).json(meal);
});

const createMeal = asyncHandler(async (req, res) => {
  const meal = await Meal.create({
    name: req.body.name,
    calories: req.body.calories,
  });

  res.status(200).json(meal);
});

const updateMeal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update ingredient ${req.params.id}` });
});
const deleteMeal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete ingredient ${req.params.id}` });
});

module.exports = {
  getMeals,
  getMeal,
  createMeal,
  updateMeal,
  deleteMeal,
};
