const asyncHandler = require("express-async-handler");

const Unit = require("../models/unitModel");

const createUnit = asyncHandler(async (req, res) => {
  const unit = await Unit.create({
    unitType: req.body.unitType,
    denom: req.body.denom,
  });

  res.status(200).json(unit);
});

const getUnit = asyncHandler(async (req, res) => {
  const unit = await Unit.findById(req.params.id);
  res.status(200).json(unit);
});

const getUnits = asyncHandler(async (req, res) => {
  const units = await Unit.find();
  res.status(200).json(units);
});

module.exports = {
  createUnit,
  getUnit,
  getUnits,
};
