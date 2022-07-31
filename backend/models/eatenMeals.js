const mongoose = require("mongoose");

const mealSchema = require("./mealModel").schema;

const Meal = mongoose.model("Meal", mealSchema);
const eatenMealSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter a meal name"],
  },

  meal: { type: mongoose.Schema.Types.ObjectId, ref: "Meal" },

  amount: {
    type: Number,
    required: [
      true,
      "Please enter the approximate amount you ate of this meal",
    ],
  },
});

module.exports = mongoose.model("eatenMeal", eatenMealSchema);
