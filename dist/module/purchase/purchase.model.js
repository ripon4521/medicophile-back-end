"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseModel = void 0;
const mongoose_1 = require("mongoose");
const paymentInfoSchema = new mongoose_1.Schema(
  {
    transactionId: { type: String, required: true },
    method: {
      type: String,
      enum: ["Bkash", "Nagad", "Bank", "Cash"],
      required: true,
    },
    accountNumber: { type: String, required: true },
    paymentMedium: {
      type: String,
      enum: ["personal", "agent", "merchant"],
    },
    paymentDate: { type: Date },
    proofUrl: { type: String },
  },
  { _id: false },
);
const PurchaseSchema = new mongoose_1.Schema(
  {
    studentId: {
      type: mongoose_1.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    courseId: {
      type: mongoose_1.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    paymentInfo: { type: paymentInfoSchema },
    status: { type: String, enum: ["Archive", "Course Out", "Active"] },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending", "Partial", "Refunded", "Rejected"],
      required: true,
    },
    purchaseToken: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    subtotal: { type: Number },
    discount: { type: Number },
    charge: { type: Number },
    totalAmount: { type: Number },
    issuedBy: {
      type: mongoose_1.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  },
);
exports.PurchaseModel = (0, mongoose_1.model)("Purchase", PurchaseSchema);
