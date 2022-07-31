const asyncHandler = require("express-async-handler");

const EatenMeal = require("../models/eatenMeals");
const getEatenMeals = asyncHandler(async (req, res) => {
  const eatenMeals = await EatenMeal.find();

  res.status(200).json(eatenMeals);
});

const createEatenMeal = asyncHandler(async (req, res) => {
  const eatenMeal = await EatenMeal.create({
    name: req.body.name,
    meal: req.body.meal,
    amount: req.body.amount,
  });

  res.status(200).json(eatenMeal);
});
const getEatenMeal = asyncHandler(async (req, res) => {
  const eatenMeal = await EatenMeal.findById(req.params.id);
  c;

  res.status(200).json(eatenMeal);
});
const updateEatenMeal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update ingredient ${req.params.id}` });
});

const deleteEatenMeal = asyncHandler(async (req, res) => {
  const mealToDelete = await EatenMeal.findById(req.params.id);
  console.log(mealToDelete);
  if (!mealToDelete) {
    res.status(400);
    throw new Error("Meal not found");
  }

  await mealToDelete.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getEatenMeals,
  getEatenMeal,
  createEatenMeal,
  updateEatenMeal,
  deleteEatenMeal,
};
