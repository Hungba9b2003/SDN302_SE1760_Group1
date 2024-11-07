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
      required: true, // The reason for the report (e.g., issue, complaint, etc.)
      maxlength: 500,
    },
    details: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "resolved", "rejected"], // The status of the report
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
