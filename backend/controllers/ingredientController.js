const asyncHandler = require("express-async-handler");

const Ingredient = require("../models/ingredientModel");
const getIngredients = asyncHandler(async (req, res) => {
  const ingredients = await Ingredient.find();

  res.status(200).json(ingredients);
});

const createIngredient = asyncHandler(async (req, res) => {
  const ingredient = await Ingredient.create({
    name: req.body.name,
    calories: req.body.calories,
    unit: req.body.unit,
  });

  res.status(200).json(ingredient);
});

const updateIngredient = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update ingredient ${req.params.id}` });
});
const deleteIngredient = asyncHandler(async (req, res) => {
  const ingredient = await Ingredient.findById(req.params.id);

  if (!ingredient) {
    res.status(400);
    throw new Error("Ingredient not found");
  }

  await ingredient.remove();
  res.status(200).json({ message: `Deleted ingredient ${req.params.id}` });
});

module.exports = {
  getIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
};
