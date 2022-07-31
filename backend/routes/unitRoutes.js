const express = require("express");
const dotenv = require("dotenv").config();

const port = process.env.PORT;
const router = express.Router();

const {
  createUnit,
  getUnit,
  getUnits,
} = require("../controllers/unitController");

router.get("/:id", getUnit);

router.post("/", createUnit);

router.get("/", getUnits);
module.exports = router;
