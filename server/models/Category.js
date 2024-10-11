const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    parentCategory: {
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
