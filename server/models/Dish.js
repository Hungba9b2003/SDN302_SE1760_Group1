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

    categories: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", //Giả sử có một collection Category để tham chiếu
      required: true,
    },
    description: {
      type: String,
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
        ref: "Review", //Giả sử có một collection Review để tham chiếu
      },
    ],
    promotion: {
      type: String,
    },
  },
  {
    collection: "Dish", // Tên collection trong MongoDB
    timestamps: true, // Thêm trường createdAt và updatedAt tự động
  }
);


const Dish = mongoose.model("Dish", DishSchema);
module.exports = Dish;
