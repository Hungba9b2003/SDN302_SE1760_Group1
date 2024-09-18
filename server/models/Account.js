const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema(
  {
    username: String,
    password: String,thanhck12345
  },
  {
    collection: "Account", // Tên collection trong MongoDB
  }
);

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
