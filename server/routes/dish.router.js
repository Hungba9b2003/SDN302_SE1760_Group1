// routes/dish.router.js
const express = require("express");
const Dish = require("../models/Dish");
const DishCategory = require("../models/Dish_Category");

const DishRouter = express.Router();

DishRouter.get("/", async (req, res) => {
  try {
    const dishes = await Dish.find().populate("categoryId", "name");
    res.json({ dishes });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dishes", error });
  }
});

DishRouter.get("/categories", async (req, res) => {
  try {
    const categories = await DishCategory.find();
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
});

module.exports = DishRouter;
