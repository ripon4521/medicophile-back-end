import mongoose, { Schema } from "mongoose";
import { IReferralReward } from "./referalReward.interface";

const referralRewardSchema = new Schema<IReferralReward>(
  {
    referDetailsId: {
      type: Schema.Types.ObjectId,
      ref: "ReferDetails",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    note: {
      type: String,
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

const ReferralReward = mongoose.model<IReferralReward>(
  "ReferralReward",
  referralRewardSchema,
);

export default ReferralReward;
