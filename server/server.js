const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const connectDB = require("./db");
const app = express();
app.use(express.json());
app.use(cors());

const Account = require("./models/Account");
connectDB();

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newAccount = new Account({ username, password: hashedPassword });
  await newAccount.save();

  res.status(201).send("User registered");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const account = await Account.findOne({ username });

  if (!account) return res.status(400).send("User not found");

  const isMatch = await bcrypt.compare(password, account.password);
  if (!isMatch) return res.status(400).send("Invalid credentials");

  const token = jwt.sign({ username: account.username }, "secret_key", {
    expiresIn: "1h",
  });

  res.json({ token });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
