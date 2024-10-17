const mongoose = require("mongoose");
const validator = require("validator");
const AccountSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: (v) =>
          validator.isStrongPassword(v, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          }),
        errorInfo: {
          code: "IPassword",
          message:
            "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character",
        },
      },
    },
    email: {
      unique: true,
      type: String,
      validate: {
        validator: (v) => validator.isEmail(v),
        errorInfo: {
          code: "IEmail",
          message: "Email is not valid",
        },
      },
    },
    status: {
      type: String,
      enum: {
        values: ["Active", "Inactive"],
      },
    },
    role: {
      type: String,
      enum: {
        values: ["Admin", "Customer", "Restaurant"],
        errorInfo: {
          code: "IRole",
          message: "Email is not valid",
        },
      },
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
    updateAt: Date,
    lastLogin: Date,
  },
  {
    collection: "Account",
    strict: false, // Cho phép thêm các trường không định nghĩa
  }
);

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
