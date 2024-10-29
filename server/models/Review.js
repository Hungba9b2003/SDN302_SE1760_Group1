const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
    {
        dishId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Dish",
            required: true,
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        description: {
            type: String,
        },
        rating: {
            type: Number,
            required: true,
        },
    },
    {
        collection: "Review", // Tên collection trong MongoDB
    }
);

const Review = mongoose.model("review", ReviewSchema);

module.exports = Review;