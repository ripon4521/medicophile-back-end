import { Schema } from "mongoose";

export interface IJob  {
    title: string;
    description: string;
    recruiter: Schema.Types.ObjectId;
    skills_required: string[];
    location: string;
    salary_range: string;
    job_type: "full-time" | "part-time" | "remote";
    postedAt: Date;
  }