const mongoose = require("mongoose");

const DishSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        unique: true,
      },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    categories: {
      type: String,
      required: true,
    },
    image: [
      {
        imagineUrl: { type: String, required: true },
        imagineName: { type: String, required: true },
      }
    ],
    discount: {
      type: Number,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    collection: "Dish", // Tên collection trong MongoDB
  }
);

const Dish = mongoose.model("Dish", DishSchema);

module.exports = Dish;
