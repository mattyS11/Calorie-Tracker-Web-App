const mongoose = require("mongoose");

const mealSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter a meal name"],
  },

  calories: {
    type: Number,
    required: [
      true,
      "Please enter the amount of calories contained in this meal.",
    ],
  },
});

module.exports = mongoose.model("Meal", mealSchema);
