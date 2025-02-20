import { model, Schema } from "mongoose";
import { ISkillGapAnalysis } from "./skillgapanalysis.interface";

const SkillGapAnalysisSchema = new Schema<ISkillGapAnalysis>(
    {
      job_seeker: { type: Schema.Types.ObjectId, ref: "JobSeeker", required: true },
      job: { type: Schema.Types.ObjectId, ref: "Job", required: true },
      missing_skills: { type: [String], default: [] },
      recommended_courses: { type: [String], default: [] },
    },
    { timestamps: true }
  );
  
  export const SkillGapAnalysisModel = model<ISkillGapAnalysis>("SkillGapAnalysis", SkillGapAnalysisSchema);