const mongoose = require("mongoose");

const unitSchema = mongoose.Schema({
  unitType: {
    type: String,
  },

  denom: {
    type: Number,
  },

  symbol: {
    type: String,
  },
});

module.exports = mongoose.model("unit", unitSchema);
