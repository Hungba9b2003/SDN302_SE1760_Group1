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
      required: true,
    },
    image: [
      {
        imageUrl: {
          type: String,
          required: true,
        },
        imageName: {
          type: String,
          required: true,
        },
      },
    ],
    categories: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    promotion: {
      type: String,
    },
    discount: {
      type: String,
    },
  },
  {
    collection: "Dish",
    timestamps: true,
  }
);

const Dish = mongoose.model("Dish", DishSchema);

module.exports = Dish;
