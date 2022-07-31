const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();

const { errorHandler } = require("./middleware/errorMiddleware");

const connectDB = require("./config/db");
const port = process.env.PORT;

connectDB();
const cors = require("cors");
const app = express();

app.use(cors());
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);
app.use("/api/ingredients", require("./routes/ingredientRoutes"));
app.use("/api/meals", require("./routes/mealRoutes"));
app.use("/api/units", require("./routes/unitRoutes"));
app.use("/api/eatenmeals", require("./routes/eatenMealsRoutes"));
app.listen(port, () => console.log(`Server Started on port ${port}`));
