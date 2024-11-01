const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    menu_name: {
      type: String,
      required: true,
    },
    menu_image: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Category", // Tên collection trong MongoDB
  }
);

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
