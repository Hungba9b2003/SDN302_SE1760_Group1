const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Restaurant", // Tham chiếu đến collection Restaurant
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Customer", // Tham chiếu đến collection Customer
    },
    reason: {
      type: String,
      required: true,
      enum: ["option1", "option2", "option3"], // Giả sử bạn có nhiều tùy chọn cho lý do
    },
    details: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "resolved", "closed"], // Các trạng thái của báo cáo
      default: "pending",
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
    resolvedAt: {
      type: Date,
    },
  },
  {
    collection: "Report", // Tên collection trong MongoDB
  }
);

const Report = mongoose.model("Report", ReportSchema);

module.exports = Report;
