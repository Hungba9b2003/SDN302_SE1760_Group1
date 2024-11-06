const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer", // Reference to the Customer collection
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant", // Reference to the Restaurant collection
    },
    orderAt: {
      type: Date,
      required: true,
    },
    deliverInfo: {
      address: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      deliveryMethod: {
        type: String,
        enum: ["doorstep", "pickup", "delivery"], // Example enum for delivery methods
      },
    },
    items: [
      {
        dishId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Dish", // Reference to the Dish collection
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    paymentMethod: {
      type: String,
      enum: ["credit_card", "cash", "other"], // Example enum for payment methods
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "canceled"], // Example enum for order statuses
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { collection: "Order" }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
