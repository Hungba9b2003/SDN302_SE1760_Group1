<<<<<<< HEAD
=======
// models/Dish.js
>>>>>>> 9c51192ad0fe223a8d9ec397e444deae0b7c172a
const mongoose = require("mongoose");

const DishSchema = new mongoose.Schema(
  {
<<<<<<< HEAD
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
=======
>>>>>>> 9c51192ad0fe223a8d9ec397e444deae0b7c172a
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
<<<<<<< HEAD
    categories: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", //Giả sử có một collection Category để tham chiếu
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: [
      {
        imagineUrl: {
          type: String,
          required: true,
        },
        imagineName: {
          type: String,
          required: true,
        },
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review", //Giả sử có một collection Review để tham chiếu
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
    collection: "Dish", // Tên collection trong MongoDB
    timestamps: true, // Thêm trường createdAt và updatedAt tự động
  }
);

const Dish = mongoose.model("dish", DishSchema);

=======
    description: {
      type: String,
    },
    image: {
      type: String,
      default: "/images/default-dish.jpg",
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dish_Category",
      required: true,
    },
  },
  {
    collection: "Dish",
    timestamps: true,
  }
);

const Dish = mongoose.model("Dish", DishSchema);
>>>>>>> 9c51192ad0fe223a8d9ec397e444deae0b7c172a
module.exports = Dish;
