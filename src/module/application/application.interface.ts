import { Schema } from "mongoose";

export interface IApplication {
    job: Schema.Types.ObjectId;
    job_seeker: Schema.Types.ObjectId;
    status: "pending" | "shortlisted" | "rejected";
    appliedAt: Date;
  }