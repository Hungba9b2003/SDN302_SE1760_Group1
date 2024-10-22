const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

// Import các controller
const {
  register,
  login,
  sendSMS,
  sendOtp,
  verifyOtp,
} = require("../controller/authController");


// Các routes cho Authentication
router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  register
);

router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);

router.post("/sendSMS", sendSMS);
router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);




module.exports = router;
