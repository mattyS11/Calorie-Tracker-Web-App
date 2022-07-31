const express = require("express");
const dotenv = require("dotenv").config();

const port = process.env.PORT;
const router = express.Router();

const {
  getEatenMeals,
  createEatenMeal,
  updateEatenMeal,
  deleteEatenMeal,
  getEatenMeal,
} = require("../controllers/eatenMealsController");

router.get("/", getEatenMeals);

router.get("/:id", getEatenMeal);

router.post("/", createEatenMeal);

router.put("/:id", updateEatenMeal);

router.delete("/:id", deleteEatenMeal);

module.exports = router;
