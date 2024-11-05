const mongoose = require("mongoose");
const validator = require("validator");
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

    avatar: {
      type: String,
      default: "/avatar/default",
    },
    updateAt: {
      type: Date,
      default: Date.now,
    },
    orders: {
      type: [],
      default: [],
    },
    cart: {
      type: [],
      default: [],
    },
    address: {
      type: [],
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
