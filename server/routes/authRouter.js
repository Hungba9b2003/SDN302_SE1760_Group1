const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { authMiddleware } = require("../middlewares/authMiddleware"); // Ensure this path is correct
const {
  isAuthenticated,
  checkToken,
  checkEmail,
  login,
  sendOtp,
  register,
  verifyOtp,
  forgetPassword,
} = require("../controller/authController"); // Ensure this path is correct
router.use(express.urlencoded({ extended: true }));

router.post("/check-token", checkToken);
router.post("/login", isAuthenticated, login);
router.post("/send-otp", isAuthenticated, sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/forget-password", forgetPassword);

const uploadPath =
<<<<<<< HEAD
  "E:/Kì 7/SDN302/SDN302_FoodDelivery/client/src/assets/img/idphoto";
=======
  "C:/Codes/MERN/SDN302_SE1760_Group1/client/src/assets/img/idphoto";

// Kiểm tra và tạo thư mục nếu chưa tồn tại
>>>>>>> 9c51192ad0fe223a8d9ec397e444deae0b7c172a
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const newFileName = file.originalname;
    cb(null, newFileName);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("cardIdPhoto"), (req, res) => {
  console.log(req.body);
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.status(200).send({
    message: "File uploaded successfully",
    file: req.file,
  });
});

// Các routes cho Authentication
router.post(
  "/register",
  upload.fields([{ name: "cardIdPhoto", maxCount: 1 }]),
  isAuthenticated,
  register
);

router.post("/check-email", checkEmail);
router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "You are authorized", user: req.user });
});
module.exports = router;
