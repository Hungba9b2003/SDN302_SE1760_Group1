const Account = require("../models/Account");
const Customer = require("../models/Customer");
const Restaurant = require("../models/Restaurant");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const multer = require("multer");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const validator = require("validator");
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

exports.checkToken = async (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    next();
    return res.status(400).json({ message: "Token is required" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Invalid token", error: err.message });
    }
    console.log(decoded);
    res.json({ decoded });
  });
};
exports.isAuthenticated = (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    next();
  } else if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        next();
      } else {
        console.log(decoded);
        res.status(400).json({
          errCode: "Iloggin",
          message: decoded,
        });
      }
      req.user = decoded;
    });
  }
};
exports.login = async (req, res) => {
  const { role, password } = req.body;
  const email = req.body.email.toLowerCase();
  try {
    if (role === "" || role == null) {
      return res
        .status(400)
        .json({ message: "Please choose role before login !" });
    } else if (
      email === "" ||
      email == null ||
      password === "" ||
      password == null
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const account = await Account.findOne({ email: email });

    if (!account) {
      return res.status(400).json({ message: "Email is not exist !" });
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect !" });
    }
    if (account.role !== role) {
      return res.status(400).json({ message: "Invalid role!" });
    }

    const token = jwt.sign(
      { email: account.email, password: account.password, role: account.role },
      process.env.JWT_SECRET,
      { expiresIn: "20m" }
    );
    await account.save();
    res.json({ token });
  } catch (error) {
    console.error(error); // Log lỗi để dễ dàng theo dõi
    res.status(500).json({ message: "Server error" });
  }
};

exports.sendOtp = async (req, res) => {
  const { role, oldEmail, type } = req.body;
  const email = req.body.email.toLowerCase();
  if (type === "register") {
    console.log("Email:", email);
    if (!email || typeof email !== "string" || email.trim() === "") {
      return res.status(400).send("Invalid email address");
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // Tạo mã OTP 6 chữ số

    let mailOptions = {
      from: "phamthuy091984@gmail.com",
      to: email.toLowerCase(),
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
        status: null,
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
  } else if (type === "forgetPassword") {
    const otp = Math.floor(100000 + Math.random() * 900000);
    await Account.findOneAndUpdate(
      { email: email },
      {
        otp: otp,
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
  }
};
exports.checkEmail = async (req, res) => {
  const email = req.body.email.toLowerCase();
  const { type } = req.body;
  if (type === "register") {
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
      // console.log(checkExist.status);
      if (checkExist) {
        if (checkExist.status == null) {
          return res.status(200).send({ message: "Email is available" });
        } else if (checkExist.status != null) {
          return res.status(400).send({ message: "Email already exists" });
        }
      } else if (errors.length > 0) {
        return res.status(400).send({ message: "Email is invalid" });
      } else {
        return res.status(200).send({ message: "Email is available" });
      }
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }
  } else if (type === "forgetPassword") {
    try {
      const checkExist = await Account.findOne({ email: email });
      // console.log(checkExist.status);
      if (checkExist) {
        return res.status(200).send({ message: "Email is oke" });
      } else if (!checkExist) {
        return res.status(400).send({ message: "Email is not exists" });
      }
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }
  }
};

exports.verifyOtp = async (req, res) => {
  const { otp } = req.body;
  const email = req.body.email.toLowerCase();
  const account = await Account.findOne({ email: email });
  console.log(otp);
  console.log(account.otp);
  if (otp == account.otp) {
    return res.status(200).send({ message: "OTP verified successfully" });
  } else {
    return res.status(400).send({ message: "Invalid OTP" });
  }
};
exports.forgetPassword = async (req, res) => {
  const { password } = req.body;
  const email = req.body.email.toLowerCase();
  if (!email || !password) {
    return res.status(400).send({ message: "Email and Password are required" });
  }
  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    return res.status(400).send({
      message:
        "Password must be at least 8 characters long, contain one uppercase letter, one special character, and one number.",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const account = await Account.findOneAndUpdate(
    { email: email },
    { password: hashedPassword },
    { new: true }
  );

  if (account) {
    return res.status(200).send({ message: "Password updated successfully" });
  } else {
    return res.status(400).send({ message: "Email does not exist" });
  }
};
exports.register = async (req, res) => {
  // Sử dụng multer để lấy dữ liệu từ req.body

  const { role } = req.body;
  console.log(role);
  if (role === "Customer") {
    const email = req.body.email.toLowerCase();
    const { password, name, phone, otp } = req.body;
    try {
      const errors = [];
      if (email == null || password == null || name == null || phone == null) {
        errors.push({
          code: "IBlank",
          message: "There are fields left blank.",
        });
      }
      const customer = new Restaurant({
        name: name,
        phone: phone,
      });
      const account = new Account({
        email: email,
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

    ///------------------------------------------------------------------
  } else if (role == "Restaurant") {
    const email = req.body.email.toLowerCase();
    const { cardId, password, name, phone, otp, address } = req.body;
    const fields = [email, cardId, address, password, name, phone, otp];

    try {
      const errors = [];
      // Kiểm tra các trường bắt buộc
      if (fields.some((field) => !field)) {
        errors.push({
          code: "IBlank",
          message: "There are fields left blank.",
        });
      }

      // Khởi tạo đối tượng account và restaurant

      const account = new Account({
        email: email,
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
          ...Object.values(accountErrors.errors).map((err) => {
            // Kiểm tra nếu properties và errorInfo tồn tại
            (err) => err.properties.errorInfo;
          })
        );
      }

      // Kiểm tra nếu số điện thoại đã được sử dụng
      if (await Restaurant.findOne({ phone: phone })) {
        errors.push({
          code: "IPhone",
          message: "Phone number is already in use",
        });
      }

      // Kiểm tra OTP
      const accountCheck = await Account.findOne({ email: email });
      if (otp != accountCheck.otp) {
        errors.push({
          code: "IOtp",
          message: "OTP is incorrect !",
        });
      }

      // Trả về lỗi nếu có
      if (errors.length > 0) {
        return res
          .status(400)
          .json({ errorType: "ValidationError", errorList: errors });
      }

      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10);

      // Cập nhật hoặc tạo mới account
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

      // Lưu thông tin restaurant vào DB
      const restaurant = new Restaurant({
        _id: account2._id,
        resName: name,
        resAddress: address,
        status: "Active",
        approved: false,
        approvedDate: null,
        idCard: cardId,
        idPhoto: cardId,
        licenceType: 0,
        phone: phone,
        updateAt: new Date().toISOString(),
      });

      await restaurant.save();
      res.status(201).json({ message: "Account registered successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message || "Server error" });
      console.error(error);
    }
  }
};
