const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/database");
const connectDB1 = require("./config/mydatabase");
<<<<<<< HEAD
const app = express();
const multer = require("multer");
const morgan = require("morgan");
const session = require("express-session");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { checkToken } = require("./middlewares/authMiddleware");
const path = require("path");
const authRoutes = require("./routes/authRouter");
const manageRoutes = require("./routes/manageRouter");
app.use(bodyParser.json());
=======
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

>>>>>>> 1d21618b4dbc0f48b9c0461d695fdff2bc0593a8
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

<<<<<<< HEAD
app.use(bodyParser.urlencoded({ extended: true }));

// connectDB();
connectDB1();

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

app.use("/check-token", checkToken);

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
app.use("/api/auth", authRoutes);
app.use("/manage", manageRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Khởi động server
const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
=======
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
  connectDB();
>>>>>>> 1d21618b4dbc0f48b9c0461d695fdff2bc0593a8
});
