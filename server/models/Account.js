const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema(
  {
    username:{
      type: String,
      required: true,
      unique: true,
      minlength: 6,
      maxlength: 20,
    },
    password:{
      type: String,
      required: true,
    } ,
    email:{
      type: String,
      // required: true,
      unique: true,
      validate: {
        validator: (v) => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        message: "Email is not valid",
      },
    },
    role:{
      type:String,
      enum: ["admin", "customer", "restaurant"],
      default: "customer",
    },
    createAt: Date,
    updateAt: Date,
    lastLogin: Date,
    profile: String,
    token: String,
  },
  {
    collection: "Account", // Tên collection trong MongoDB
  }
);

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
