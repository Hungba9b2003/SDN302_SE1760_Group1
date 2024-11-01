const mongoose = require("mongoose");

const DishCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      default: "/images/default-category.jpg",
    },
  },
  {
    collection: "Dish_Category",
    timestamps: true,
  }
);

const DishCategory = mongoose.model("Dish_Category", DishCategorySchema);
module.exports = DishCategory;
