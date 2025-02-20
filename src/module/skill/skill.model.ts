import { model, Schema } from "mongoose";
import { ISkill } from "./skill.interface";

const SkillSchema = new Schema<ISkill>(
    {
      name: { type: String, required: true },
      category: { type: String, enum: ["technical", "soft_skills"], required: true },
      description: { type: String },
    },
    { timestamps: true }
  );
  
  export const SkillModel = model<ISkill>("Skill", SkillSchema);