const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const connectDB = require("./config/database");
const connectDB1 = require("./config/mydatabase");
const authRoutes = require("./routes/authRouter");
const app = express();
const multer = require("multer");
const morgan = require("morgan");
const authMiddleware = require("./middlewares/authMiddleware");
const dotenv = require("dotenv");
const CustomerRouter = require("./routes/Customer.router");
const OrderRouter = require("./routes/order.router");
const bodyParser = require("body-parser");

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
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
app.use("/api/customer", authMiddleware, CustomerRouter);
app.use("/api/order", authMiddleware, OrderRouter);

const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
