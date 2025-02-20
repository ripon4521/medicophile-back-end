import { model, Schema } from "mongoose";
import { IInterview } from "./interview.interface";

const InterviewSchema = new Schema<IInterview>(
    {
      application: { type: Schema.Types.ObjectId, ref: "Application", required: true },
      scheduledAt: { type: Date, required: true },
      interview_type: { type: String, enum: ["video", "in-person"], required: true },
      feedback: { type: String },
      status: { type: String, enum: ["completed", "pending"], required: true },
    },
    { timestamps: true }
  );
  
  export const InterviewModel = model<IInterview>("Interview", InterviewSchema);