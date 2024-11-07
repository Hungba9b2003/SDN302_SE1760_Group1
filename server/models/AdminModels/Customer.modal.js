const mongoose = require("mongoose");

// Define the Customer Schema
const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: [
      {
        location: { type: String, required: true },
        phone: { type: String, required: true },
      },
    ],
    avatar: { type: String, required: true },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order", // Reference to the Order model
      },
    ],
    carts: [
      {
        dishId: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Dish", // Reference to the Dish model
          },
        ],
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0.1 },
      },
    ],
  },
  {
    collection: "Customer",
  }
);

// Create a Customer model from the schema
const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;
