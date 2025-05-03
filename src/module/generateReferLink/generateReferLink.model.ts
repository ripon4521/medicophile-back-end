import mongoose, { Schema, Document } from "mongoose";
import { IReferral } from "./generateReferLink.interface";


const referralSchema = new Schema<IReferral>({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", 
      required: true,
    },
  
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
  }, {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }
  });
  


const ReferralLinkModel = mongoose.model<IReferral>("ReferralLink", referralSchema);

export default ReferralLinkModel;
