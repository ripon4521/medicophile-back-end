import { model, Schema } from "mongoose";
import { IJob } from "./job.interface";

const JobSchema = new Schema<IJob>(
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      recruiter: { type: Schema.Types.ObjectId, ref: "Recruiter", required: true },
      skills_required: { type: [String], default: [] },
      location: { type: String, required: true },
      salary_range: { type: String, required: true },
      job_type: { type: String, enum: ["full-time", "part-time", "remote"], required: true },
    },
    { timestamps: { createdAt: "postedAt" } }
  );
  
  export const JobModel = model<IJob>("Job", JobSchema);