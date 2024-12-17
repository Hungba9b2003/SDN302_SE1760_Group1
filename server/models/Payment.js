const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account", // Giả sử có một collection Account để tham chiếu
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order", // Giả sử có một collection Order để tham chiếu
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0, // Số tiền phải lớn hơn hoặc bằng 0
    },
    transactionCode: {
      type: String,
      required: true,
    },
    createAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    updateAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    collection: "payment",
    timestamps: true, //Không cần thiết vì đã có createAt và updateAt
  }
);

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
