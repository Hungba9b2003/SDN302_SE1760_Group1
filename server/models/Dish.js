// models/Dish.js
const mongoose = require("mongoose");

const DishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      default: "/images/default-dish.jpg",
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dish_Category",
      required: true,
    },
  },
  {
    collection: "Dish",
    timestamps: true,
  }
);

const Dish = mongoose.model("Dish", DishSchema);
module.exports = Dish;
