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