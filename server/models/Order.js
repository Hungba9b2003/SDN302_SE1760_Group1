const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Customer", // Tham chiếu đến collection Customer
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Restaurant", // Tham chiếu đến collection Restaurant
    },
    orderAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    deliverInfo: {
      address: {
        location: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: true,
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
          ref: "Dish", // Tham chiếu đến collection Dish (giả sử có collection món ăn)
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    paymentMethod: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "failed", "completed"],
      default: "pending",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "Order", // Tên collection trong MongoDB
  }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
