import { model, Schema } from "mongoose";
import { IMockInterview } from "./mockInterview.interface";

const MockInterviewSchema = new Schema<IMockInterview>(
    {
      job_seeker: { type: Schema.Types.ObjectId, ref: "JobSeeker", required: true },
      questions: { type: [String], required: true },
      responses: [{ question: String, answer: String, confidence_score: Number }],
      feedback: { type: String, required: true },
    },
    { timestamps: true }
  );
  
  export const MockInterviewModel = model<IMockInterview>("MockInterview", MockInterviewSchema);