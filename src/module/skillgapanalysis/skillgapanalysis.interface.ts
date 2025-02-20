import { Schema } from "mongoose";

export interface ISkillGapAnalysis {
    job_seeker: Schema.Types.ObjectId;
    job: Schema.Types.ObjectId;
    missing_skills: string[];
    recommended_courses: string[];
  }