const Category = require("../models/Category");
const Dish = require("../models/Dish");
const Restaurant = require("../models/Restaurant");
// Hàm lấy dữ liệu từ các models
const getAllData = async () => {
  const [categories, dishs, restaurants] = await Promise.all([
    Category.find(),
    Dish.find().populate("categories reviews"), // Populate các tham chiếu nếu có
    Restaurant.find(),
  ]);

  return {
    categories,
    dishs,
    restaurants,
  };
};

module.exports = getAllData;
