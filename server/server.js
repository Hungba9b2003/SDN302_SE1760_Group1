const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/database");
const connectDB1 = require("./config/mydatabase");
const authRoutes = require("./routes/authRouter");
const app = express();
const multer = require("multer");
const morgan = require("morgan");
const session = require("express-session");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const manageRoutes = require("./routes/manageRouter");
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

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
});
