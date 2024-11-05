const mongoose = require("mongoose");
const validator = require("validator");
const OrderSchema = new mongoose.Schema({
  customeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Customer",
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Restaurant",
  },
  orderAt: {
    type: Date,
    default: Date.now(),
  },
  deliveryInfo: {
    address: {
      location: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    deliveryMethod: {
      type: String,
      required: true,
    },
  },
  items: [
    {
      dishId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Dish",
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
        min: 0.01,
      },
    },
  ],
  paymentMethod: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: {
      values: ["Pending", "Confirmed", "Canceled", "Completed"],
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0.01,
    },
  },
  collection: "Order",
  strict: false, // Cho phép thêm các trường không định nghĩa
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
