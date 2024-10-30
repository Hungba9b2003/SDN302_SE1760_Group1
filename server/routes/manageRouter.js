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
  deleteDish,
  getCategory,
  newCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/dishController");



// Các routes cho Dish
router.post(
  "/create-dish", 
  upload.array('image', 10), // Cho phép upload nhiều file
  [
    body("name").notEmpty().withMessage("Dish name is required"),
    body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  ],
  createDish
);

router.get("/dish", getDishes);
router.get("/category", getCategory);
router.get("/dish/:id", getDishById);
router.put(
  "/dish/:id", upload.array('image',10),
  [
    body("name").notEmpty().withMessage("Dish name is required"),
    body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  ],
  updateDish
);

router.delete("/dish/:id", deleteDish);

router.post(
  "/category",
  upload.single('menu_image'), // Upload một file menu_image cho Category
  [
    body("name").notEmpty().withMessage("Category name is required")
  ],
  newCategory
);
router.put(
  "/category/:id",
  upload.single('menu_image'), // Upload một file menu_image cho Category
  [
    body("name").notEmpty().withMessage("Category name is required")
  ],
  updateCategory
);
router.delete("/category/:id", deleteCategory);
module.exports = router;
