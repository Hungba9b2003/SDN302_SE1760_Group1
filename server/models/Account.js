const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema(
  {
    username: String,
<<<<<<< HEAD
    password: String,
=======
    password: String,thanhck12345
>>>>>>> 8f2c448cf2c692a1a1dfd3b10ca551cfd9ea3664
  },
  {
    collection: "Account", // Tên collection trong MongoDB
  }
);

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
