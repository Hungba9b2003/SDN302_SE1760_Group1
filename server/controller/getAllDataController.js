const Category = require("../models/Category");
const Account = require("../models/Account");
const Customer = require("../models/Customer");
const Dish = require("../models/Dish");
const Order = require("../models/Order");
const Payment = require("../models/Payment");
const Report = require("../models/Report");
const Restaurant = require("../models/Restaurant");
const Review = require("../models/Review");
const Food = require("../models/Food");
// Hàm lấy dữ liệu từ các models
const getAllData = async () => {
  const [
    categories,
    accounts,
    customers,
    dishs,
    orders,
    payments,
    reports,
    restaurants,
    reviews,
    Foods,
  ] = await Promise.all([
    Category.find(),
    Account.find(),
    Customer.find(),
    Dish.find().populate("categories reviews"), // Populate các tham chiếu nếu có
    Order.find(),
    Payment.find(),
    Report.find(),
    Restaurant.find(),
    Review.find(),
    Food.find(),
  ]);

  return {
    categories,
    accounts,
    customers,
    dishs,
    orders,
    payments,
    reports,
    restaurants,
    reviews,
    Foods,
  };
};

module.exports = getAllData;
