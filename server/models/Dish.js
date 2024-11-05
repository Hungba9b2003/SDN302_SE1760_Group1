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
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    image: [{
      type: String,
      required: true,
    }],
    discount: {
      type: Number,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
      },
    ],
  },
  {
    collection: "Dish", // Tên collection trong MongoDB
  }
);

const Dish = mongoose.model("dish", DishSchema);

module.exports = Dish;
