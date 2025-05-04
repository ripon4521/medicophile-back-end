import { Schema, model } from "mongoose";
import { IReferralWithdrawal } from "./withdraw.interface";

const referralWithdrawalSchema = new Schema<IReferralWithdrawal>(
  {
    referrerId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    amount: { type: Number, required: true },
    method: {
      type: String,
      enum: ["bkash", "nagad", "bank", "cash"],
      required: true,
    },
    accountNo: { type: String },
    paymentMedium: {
      type: String,
      enum: ["personal", "agent", "merchant"],
      required: true,
    },
    requestDate: {
      type: Date,
      default: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
    approved: { type: Boolean, default: false },
    approvedAt: { type: Date },
    note: { type: String },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  },
);

const ReferralWithdrawal = model<IReferralWithdrawal>(
  "ReferralWithdrawal",
  referralWithdrawalSchema,
);

export default ReferralWithdrawal;
