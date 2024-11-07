const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    menu_image: {
      type: String,
    },
  },
  {
    collection: "Category", // Tên collection trong MongoDB
  }
);

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
