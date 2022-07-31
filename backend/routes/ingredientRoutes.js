const express = require("express");
const dotenv = require("dotenv").config();

const port = process.env.PORT;
const router = express.Router();

const {
  getIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} = require("../controllers/ingredientController");

router.get("/", getIngredients);

router.post("/", createIngredient);

router.put("/:id", updateIngredient);

router.delete("/:id", deleteIngredient);

module.exports = router;
