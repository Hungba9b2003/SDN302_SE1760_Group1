const Account = require("../models/Account");
const Customer = require("../models/Customer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const session = require("express-session");
const { default: isEmail } = require("validator/lib/isEmail");

dotenv.config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "phamthuy091984@gmail.com",
    pass: "nepb skbc pikd sugs",
  },
});

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const account = await Account.findOne({ username });
    if (!account) {
      return res.status(400).json({ message: "Invalid" });
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid" });
    }

    const token = jwt.sign(
      { id: account.id, role: account.role },
      process.env.JWT_SECRET,
      { expiresIn: "1m" }
    );

    account.token = token;
    await account.save();

    res.json({ token });
  } catch (error) {
    console.error(error); // Log lỗi để dễ dàng theo dõi
    res.status(500).json({ message: "Server error" });
  }
};
exports.sendOtp = async (req, res) => {
  const { email, role, oldEmail } = req.body;
  console.log("Email:", email);
  if (!email || typeof email !== "string" || email.trim() === "") {
    return res.status(400).send("Invalid email address");
  }

  const otp = Math.floor(100000 + Math.random() * 900000); // Tạo mã OTP 6 chữ số

  let mailOptions = {
    from: "phamthuy091984@gmail.com",
    to: email,
    subject: "OTP Verification",
    text: `Your OTP code is ${otp}`,
  };
  await Account.findOneAndUpdate(
    { email: oldEmail ? oldEmail : email },
    {
      email: email,
      password: "Abac12345678@!",
      role: role,
      updateAt: new Date().toISOString(),
      otp: otp,
      lastLogin: null,
    },
    {
      new: true,
      upsert: true,
    }
  );

  setTimeout(async () => {
    try {
      await Account.updateOne({ email: email }, { otp: null });
    } catch (error) {
      console.error("Error removing OTP:", error);
    }
  }, 600000);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Error sending OTP");
    } else {
      console.log("Email sent:", info.response);
      req.session.otp = otp;
      req.session.email = email;
      return res.status(200).send({ message: "OTP sent successfully", otp });
    }
  });
};

exports.checkEmail = async (req, res) => {
  const { email } = req.body;
  console.log("Email:", email);
  let account = new Account({
    email: email,
    password: "Abac12345678@!",
    role: "Customer",
    updateAt: new Date().toISOString(),
    otp: null,
    lastLogin: null,
  });
  const errors = [];
  const accountErrors = account.validateSync();
  if (accountErrors) {
    errors.push(
      ...Object.values(accountErrors.errors).map(
        (err) => err.properties.errorInfo
      )
    );
  }
  try {
    const checkExist = await Account.findOne({ email: email });
    if (checkExist && checkExist.status != null) {
      return res.status(400).send({ message: "Email already exists" });
    }
    if (errors.length > 0) {
      return res.status(400).send({ message: "Email is invalid" });
    } else {
      return res.status(200).send({ message: "Email is available" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Error" });
  }
};

exports.verifyOtp = (req, res) => {
  const { enteredOtp } = req.body;
  const sentOtp = req.session.otp;
  if (enteredOtp === sentOtp) {
    return res.status(200).send({ message: "OTP verified successfully" });
  } else {
    return res.status(400).send({ message: "Invalid OTP" });
  }
};

exports.register = async (req, res) => {
  // Sử dụng multer để lấy dữ liệu từ req.body

  console.log("Received body:", req.body); // Kiểm tra dữ liệu nhận được
  const { role } = req.body;
  if (role === "Customer") {
    const { email, password, name, phone, otp } = req.body;
    try {
      const errors = [];
      if (email == null || password == null || name == null || phone == null) {
        errors.push({
          code: "IBlank",
          message: "There are fields left blank.",
        });
      }
      const customer = new Customer({
        name: name,
        phone: phone,
      });
      const account = new Account({
        email: email,
        name: name,
        password: password,
        role: role,
        phone: phone,
        updateAt: new Date().toISOString(),
        lastLogin: null,
      });

      // Kiểm tra hợp lệ của account
      const accountErrors = account.validateSync();
      if (accountErrors) {
        errors.push(
          ...Object.values(accountErrors.errors).map(
            (err) => err.properties.errorInfo
          )
        );
      }

      // Kiểm tra hợp lệ của customer
      const customerErrors = customer.validateSync();
      if (customerErrors) {
        errors.push(
          ...Object.values(customerErrors.errors).map(
            (err) => err.properties.errorInfo
          )
        );
      }
      if (await Customer.findOne({ phone: phone })) {
        errors.push({
          code: "IPhone",
          message: "Phone number is already in use",
        });
      }

      const accountCheck = await Account.findOne({ email: email });
      if (otp != accountCheck.otp) {
        errors.push({
          code: "IOtp",
          message: "OTP is incorrect !",
        });
      }

      if (errors.length > 0) {
        return res
          .status(200)
          .json({ errorType: "ValidationError", errorList: errors });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const account2 = await Account.findOneAndUpdate(
        { email: email },
        {
          email: email,
          name: name,
          password: hashedPassword,
          role: role,
          phone: phone,
          status: "Active",
          updateAt: new Date().toISOString(),
          lastLogin: null,
        },
        {
          new: true,
          upsert: true,
        }
      );
      const customer2 = new Customer({
        _id: account2._id,
        name: name,
        phone: phone,
        updateAt: new Date().toISOString(),
      });

      await customer2.save();
      res.status(201).json({ message: "Account registered successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message || "Server error" });
      console.error(error);
    }
  } else {
    res.status(400).json({
      errorType: "RoleFailed",
      message: "Role must be either Admin, Customer, or Restaurant",
    });
  }
};
