const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const connectDB = require("./config/database");
const connectDB1 = require("./config/mydatabase");
const Db = require("./config/dB");
const authRoutes = require("./routes/authRouter");
const detailRouter = require("./routes/detailRouter");
const getAllData = require("./controller/getAllDataController");
const Account = require("./models/Account");
const session = require("express-session");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

// Initialize express app
const app = express();

// Add resource control middleware
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
// connectDB();
// connectDB1();
// app.use(
//   session({
//     secret: "your_secret_key", // Thay thế bằng khóa bí mật của bạn
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }, // Đặt true khi bạn chạy trên HTTPS
//   })
// );

app.get("/", async (req, res, next) => {
  try {
    // Lấy dữ liệu từ getAllData
    const allData = await getAllData();

    res.status(200).json({
      message: "Welcome to REST server", // Thông báo chào mừng
      data: allData, // Dữ liệu từ các models
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// recieve request
// app.use("/", getAll);
app.use("/api/auth", authRoutes);
app.use("/api/details", detailRouter);

// Them middleware kiem soat requests loi cho web server
app.use(async (req, res, next) => {
  next(httpErrors.BadRequest());
});

app.use(async (err, req, res, next) => {
  res.status = err.status || 500;
  res.send({ message: { status: err.status, message: err.message } });
});

const port = process.env.PORT_NUMBER || 6969;
const hostname = process.env.HOST_NAME;
app.listen(port, hostname, () => {
  console.log(`Server running at: http://${hostname}:${port}`);
  Db.connectDB();
});
