import { model, Schema } from "mongoose";
import { IApplication } from "./application.interface";

const ApplicationSchema = new Schema<IApplication>(
    {
      job: { type: Schema.Types.ObjectId, ref: "Job", required: true },
      job_seeker: { type: Schema.Types.ObjectId, ref: "JobSeeker", required: true },
      status: { type: String, enum: ["pending", "shortlisted", "rejected"], required: true },
    },
    { timestamps: { createdAt: "appliedAt" } }
  );
  
  export const ApplicationModel = model<IApplication>("Application", ApplicationSchema);