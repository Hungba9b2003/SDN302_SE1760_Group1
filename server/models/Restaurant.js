const mongoose = require("mongoose");
const validator = require("validator");
const RestaurantSchema = new mongoose.Schema(
  {
    resName: {
      type: String,
      required: true,
    },
    resAddress: {
      type: String,
      required: true,
    },

    restImage: [
      {
        type: String,
      },
    ],

    status: {
      type: String,
      enum: ["Active", "InActive"],
      default: "Active",
    },
    approved: {
      type: Boolean,
      default: false,
    },

    cartId: {
      type: String,
    },
    approvealDate: {
      type: Date,
    },
    menu: [
      {
        dishId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }, // Đảm bảo ref đến model Dish
        status: String
      }
    ],

    approvalDate: {
      type: Date,
      default: Date.now,
    },
    menu: [],

    revenueReport: [],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updateAt: {
      type: Date,
      default: Date.now,
    },
    licenceType: {
      type: Number,
    },
  },
  {
    collection: "Restaurant",
    strict: false,
  }
);

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;
