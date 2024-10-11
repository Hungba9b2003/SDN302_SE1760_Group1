const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    dishId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dish", // Giả sử có một collection Dish để tham chiếu
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer", // Giả sử có một collection Customer để tham chiếu
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now, // Thiết lập giá trị mặc định là thời điểm hiện tại
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number, // Sử dụng Number thay vì int để phù hợp với Mongoose
      required: true,
      min: 1,
      max: 5, // Giới hạn rating từ 1 đến 5 sao
    },
  },
  {
    collection: "Reviews",
    timestamps: true, // Thêm trường createdAt và updatedAt
  }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
