const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    reason: {
      type: String,
      required: true, // The reason for the report (e.g., issue, complaint, etc.)
      maxlength: 500,
    },
    details: {
      type: String,
      required: true, // More details about the report
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "resolved", "rejected"], // The status of the report
      default: "pending",
    },
    createdDate: {
      type: Date,
      default: Date.now, // When the report was created
      required: true,
    },
    resolvedAt: {
      type: Date, // The date the issue was resolved (if applicable)
    },
  },
  { collection: "Report" }
);

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
