const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const multer = require("multer");
const path = require("path");

// Cấu hình multer để lưu ảnh
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads'); // Thư mục lưu ảnh
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Tên file được lưu
  }
});

const upload = multer({ storage: storage });

// Import các controller
const {
  createDish,
  getDishes,
  getDishById,
  updateDish,
  deleteDish
} = require("../controller/dishController");



// Các routes cho Dish
router.post(
  "/createDish", 
  upload.array('image', 10), // Cho phép upload nhiều file
  [
    body("name").notEmpty().withMessage("Dish name is required"),
    body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  ],
  createDish
);

router.get("/dish", getDishes);
router.get("/dish/:id", getDishById);
router.put(
  "/dish/:id", upload.single('image'),
  [
    body("name").notEmpty().withMessage("Dish name is required"),
    body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  ],
  updateDish
);

router.delete("/dish/:id", deleteDish);

module.exports = router;
