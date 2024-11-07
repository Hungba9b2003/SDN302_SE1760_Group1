const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/database");
const connectDB1 = require("./config/mydatabase");

const authRoutes = require("./routes/authRouter");
const adminRouter = require("./routes/adminRouter");
const app = express();
const multer = require("multer");
const morgan = require("morgan");
const session = require("express-session");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { checkToken, authMiddleware } = require("./middlewares/authMiddleware");
const path = require("path");
const detailRouter = require("./routes/detailRouter");
const getAllData = require("./controller/getAllDataController");
const Account = require("./models/Account");
const DishRouter = require("./routes/dish.router");
const OrderRouter = require("./routes/order.router");
const CustomerRouter = require("./routes/Customer.router");

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.post("/api/decode-token", (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Invalid token", error: err.message });
    }
    res.json({ decoded });
  });
});

app.use("/assets", express.static("src/assets"));
app.use("/api/auth", authRoutes);
app.use("/api/customer", authMiddleware, CustomerRouter);
app.use("/api/order", authMiddleware, OrderRouter);
app.use("/api/dish", DishRouter);

app.use("/check-token", checkToken);

// Cấu hình session
connectDB();
// connectDB1();
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // `secure: false` cho môi trường phát triển
  })
);

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
// Routes
app.use("/api/auth", authRoutes);
// app.use("/manage", manageRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/details", detailRouter);
app.use("/admin", adminRouter);
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Khởi động server
const port = process.env.PORT_NUMBER || 6969;
const hostname = process.env.HOST_NAME;
app.listen(port, hostname, () => {
  console.log(`Server running at: http://${hostname}:${port}`);
  connectDB();
});
