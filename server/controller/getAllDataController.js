const Category = require("../models/Category");
const Account = require("../models/Account");
const Customer = require("../models/Customer");
const Detail = require("../models/Detail");
const Order = require("../models/Order");
const Payment = require("../models/Payment");
const Report = require("../models/Report");
const Restaurant = require("../models/Restaurant");
const Review = require("../models/Review");

// Hàm lấy dữ liệu từ các models
const getAllData = async () => {
  const [
    categories,
    accounts,
    customers,
    details,
    orders,
    payments,
    reports,
    restaurants,
    reviews,
  ] = await Promise.all([
    Category.find(),
    Account.find(),
    Customer.find(),
    Detail.find().populate("categories reviews"), // Populate các tham chiếu nếu có
    Order.find(),
    Payment.find(),
    Report.find(),
    Restaurant.find(),
    Review.find(),
  ]);

  return {
    categories,
    accounts,
    customers,
    details,
    orders,
    payments,
    reports,
    restaurants,
    reviews,
  };
};

module.exports = getAllData;
