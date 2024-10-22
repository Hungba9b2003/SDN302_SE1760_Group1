const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    food_id: {
      type: Number,
      required: true,
    },
    food_name: {
      type: String,
      required: true,
    },
    food_image: {
      type: String, // Bạn có thể thay đổi kiểu dữ liệu này nếu cần lưu trữ URL hoặc đường dẫn ảnh
      required: true,
    },
    food_price: {
      type: Number,
      required: true,
    },
    food_desc: {
      type: String,
      required: true,
    },
    food_category: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Food", // Tên collection trong MongoDB
  }
);

const Food = mongoose.model("Food", FoodSchema);

module.exports = Food;
