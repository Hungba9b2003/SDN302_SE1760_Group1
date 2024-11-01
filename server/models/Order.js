const mongoose = require("mongoose");
<<<<<<< HEAD
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
=======

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
>>>>>>> 1d21618b4dbc0f48b9c0461d695fdff2bc0593a8
    },
    totalPrice: {
      type: Number,
      required: true,
<<<<<<< HEAD
      min: 0.01,
    },
  },
  collection: "orders",
  strict: false, // Cho phép thêm các trường không định nghĩa
});
=======
    },
  },
  {
    collection: "Order", // Tên collection trong MongoDB
  }
);
>>>>>>> 1d21618b4dbc0f48b9c0461d695fdff2bc0593a8

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
