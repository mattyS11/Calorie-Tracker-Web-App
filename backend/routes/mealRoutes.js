const express = require("express");
const dotenv = require("dotenv").config();

const port = process.env.PORT;
const router = express.Router();

const {
  getMeals,
  getMeal,
  createMeal,
  updateMeal,
  deleteMeal,
} = require("../controllers/mealController");

router.get("/", getMeals);

router.get("/:id", getMeal);

router.post("/", createMeal);

router.put("/:id", updateMeal);

router.delete("/:id", deleteMeal);

module.exports = router;
