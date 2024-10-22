const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require('path');
// Kết nối database
const connectDB = require("./config/database");
const mydatabase = require("./config/mydatabase");
// Routes
const authRoutes = require("./routes/authRouter");
const manageRoutes = require("./routes/manageRouter");

dotenv.config();
const app = express();

// Middleware
app.use(morgan("dev")); // Logging requests
app.use(cors()); // Cho phép cross-origin requests
app.use(bodyParser.json()); // Parse JSON body
app.use(express.json()); // Xử lý JSON

// Kết nối tới database MongoDB
// connectDB();
mydatabase();

// Cấu hình session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // `secure: false` cho môi trường phát triển
  })
);

// Routes
app.use("/api/auth", authRoutes); // Đường dẫn cho authentication và các chức năng liên quan
app.use("/manage", manageRoutes); // Đường dẫn cho quản lý Category và Dish
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Xử lý lỗi cho các route không tồn tại
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Khởi động server
const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
