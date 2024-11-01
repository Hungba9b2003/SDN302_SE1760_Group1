const mongoose = require("mongoose");

const DishSchema = new mongoose.Schema(
  {
<<<<<<< HEAD
    name: {
        type: String,
        required: true,
        unique: true,
      },
    description: {
      type: String,
=======
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
>>>>>>> 1d21618b4dbc0f48b9c0461d695fdff2bc0593a8
    },
    price: {
      type: Number,
      required: true,
    },
    categories: {
      type: mongoose.Schema.Types.ObjectId,
<<<<<<< HEAD
      ref: "category",
=======
      ref: "Category", //Giả sử có một collection Category để tham chiếu
      required: true,
    },
    description: {
      type: String,
>>>>>>> 1d21618b4dbc0f48b9c0461d695fdff2bc0593a8
      required: true,
    },
    image: [
      {
<<<<<<< HEAD
        imagineUrl: { type: String, required: true },
        imagineName: { type: String, required: true },
      }
    ],
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
=======
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
>>>>>>> 1d21618b4dbc0f48b9c0461d695fdff2bc0593a8
  }
);

const Dish = mongoose.model("dish", DishSchema);

module.exports = Dish;
