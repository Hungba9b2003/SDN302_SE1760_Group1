<<<<<<< HEAD
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
    {  
        menu_image:{
            type: String,
        },
        name: {
            type: String,
            required: true,
            unique: true,
            },
    },
    {
        collection: 'Category',
    });

const Category = mongoose.model('category', CategorySchema);

module.exports = Category;
=======
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
>>>>>>> 1d21618b4dbc0f48b9c0461d695fdff2bc0593a8
