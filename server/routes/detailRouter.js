const express = require("express");
const mongoose = require("mongoose");
const Detail = require("../models/Detail"); // Đảm bảo đường dẫn này trỏ đúng đến nơi lưu trữ model Detail
const detailRouter = express.Router();

// Route: Lấy tất cả các chi tiết
detailRouter.get("/", async (req, res) => {
  try {
    const details = await Detail.find().populate("categories reviews");
    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route: Lấy một chi tiết cụ thể theo ID
detailRouter.get("/:id", async (req, res) => {
  try {
    const detail = await Detail.findById(req.params.id).populate(
      "categories reviews"
    );
    if (!detail) {
      return res.status(404).json({ message: "Detail not found" });
    }
    res.status(200).json(detail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route: Tạo mới một chi tiết
detailRouter.post("/create", async (req, res) => {
  const { name, price, categories, description, image, promotion, discount } =
    req.body;
  const detail = new Detail({
    _id: new mongoose.Types.ObjectId(),
    name,
    price,
    categories,
    description,
    image,
    promotion,
    discount,
  });

  try {
    const newDetail = await detail.save();
    res.status(201).json(newDetail);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route: Cập nhật một chi tiết theo ID
detailRouter.put("/:id", async (req, res) => {
  try {
    const updatedDetail = await Detail.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDetail) {
      return res.status(404).json({ message: "Detail not found" });
    }
    res.status(200).json(updatedDetail);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route: Xóa một chi tiết theo ID
detailRouter.delete("/:id", async (req, res) => {
  try {
    const deletedDetail = await Detail.findByIdAndDelete(req.params.id);
    if (!deletedDetail) {
      return res.status(404).json({ message: "Detail not found" });
    }
    res.status(200).json({ message: "Detail deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = detailRouter;
