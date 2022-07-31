const mongoose = require("mongoose");
const unitSchema = require("./unitModel").schema;
const Unit = mongoose.model("Unit", unitSchema);
const ingredientSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter a name"],
  },

  calories: {
    type: Number,
  },

  unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Unit",
    required: [true, "Please enter an ID corresponding to the unit"],
  },
});

module.exports = mongoose.model("Ingredient", ingredientSchema);
