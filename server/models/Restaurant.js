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
    restImage: {
      type: [],
    },
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
