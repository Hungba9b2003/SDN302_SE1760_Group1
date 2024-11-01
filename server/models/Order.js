const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
<<<<<<< HEAD
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
=======
      ref: "Customer",
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
>>>>>>> 9c51192ad0fe223a8d9ec397e444deae0b7c172a
    },
    items: [
      {
        dishId: {
          type: mongoose.Schema.Types.ObjectId,
<<<<<<< HEAD
          required: true,
          ref: "Dish", // Tham chiếu đến collection Dish (giả sử có collection món ăn)
=======
          ref: "Dish",
          required: true,
>>>>>>> 9c51192ad0fe223a8d9ec397e444deae0b7c172a
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
<<<<<<< HEAD
    paymentMethod: {
      type: String,
=======
    totalAmount: {
      type: Number,
>>>>>>> 9c51192ad0fe223a8d9ec397e444deae0b7c172a
      required: true,
    },
    status: {
      type: String,
<<<<<<< HEAD
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
=======
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "Order",
    timestamps: true,
>>>>>>> 9c51192ad0fe223a8d9ec397e444deae0b7c172a
  }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
