const mongoose = require("mongoose");
const validator = require("validator");

// Cart Schema
const CartSchema = new mongoose.Schema(
  {
    items: [
      {
        dishId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Dish",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  }
);

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      validate: {
        validator: (v) => validator.isMobilePhone(v),
        errorInfo: {
          code: "IPhone",
          message: "Phone number is not valid",
        },
      },
    },

    address: [
      {
        type: String,
        required: true,
      },
    ],
    avatar: {
      type: String,
      default: "/avatar/default",
    },
    updateAt: {
      type: Date,
      default: Date.now,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    cart: {
      type: CartSchema,
      default: {},
    },
    address: {
      type: Array,
      default: [],
    },
  },
  {
    collection: "Customer",
    strict: false,
  }
);

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;
