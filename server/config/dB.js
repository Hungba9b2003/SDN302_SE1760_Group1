// hoat dong tao ra cac doi tuong anh xa tu CSDL thong qua cac model
const mongoose = require("mongoose");
const Category = require("../models/Category");
const Acount = require("../models/Account");
const Customer = require("../models/Customer");
const Detail = require("../models/Detail");
const Order = require("../models/Order");
const Payment = require("../models/Payment");
const Report = require("../models/Report");
const Restaurant = require("../models/Restaurant");
const Review = require("../models/Review");

const Db = {}; // doi tuong dai dien cho DB gom co cac thuoc tinh {Entity object} và phương thưc kết nối CSDL

Db.Category = Category;
Db.Acount = Acount;
Db.Customer = Customer;
Db.Detail = Detail;
Db.Order = Order;
Db.Payment = Payment;
Db.Report = Report;
Db.Restaurant = Restaurant;
Db.Review = Review;

// ket noi csdl
Db.connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => console.log("Conect to MongoDB successfully"));
  } catch (error) {
    next(error);
    process.exit();
  }
};

module.exports = Db;
