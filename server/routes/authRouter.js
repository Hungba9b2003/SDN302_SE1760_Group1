const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const {
  checkEmail,
  login,
  sendOtp,
  register,
  verifyOtp,
} = require("../controller/authController"); // Ensure this path is correct

// Define your routes
router.post("/login", login);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/register", upload.none(), register);
router.post("/check-email", checkEmail);

module.exports = router;
