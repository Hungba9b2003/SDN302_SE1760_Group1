const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const connectDB = require("./config/database");
const connectDB1 = require("./config/mydatabase");
const authRoutes = require('./routes/authRouter');
const app = express();

app.use(express.json());
app.use(cors());

const Account = require("./models/Account");
// connectDB();
connectDB1();

// Hàm xóa các token hết hạn
const clearExpiredTokens = async () => {
  const expiredDate = new Date(Date.now() - 3600000);
  await Account.updateMany(
      { token: { $ne: null }, updatedAt: { $lt: expiredDate } },
      { $set: { token: null } }
  );
};

setInterval(clearExpiredTokens, 600000);


app.use('/api/auth', authRoutes);


const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});