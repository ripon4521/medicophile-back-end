import mongoose, { Schema, Document } from "mongoose";
import { IReferDetails } from "./referDetails.interface";

const referDetailsSchema = new Schema<IReferDetails>(
  {
    referrerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    referredUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    purchaseTokenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchaseToken", // Optional: purchase info
    },
    referredAt: {
      type: Date,
      default: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  },
);

const ReferDetails = mongoose.model<IReferDetails>(
  "ReferDetails",
  referDetailsSchema,
);

export default ReferDetails;
