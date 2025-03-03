import mongoose, { Schema } from "mongoose";
import { ICourse } from "./course.interface";

const CourseSchema = new Schema<ICourse>({
    course_code: { type: String, required: true },
    course_name: { type: String, required: true },
    credits: { type: Number, required: true, min: 1 },
    department: { type: String, required: true },
    prerequisites: { type: [String], default: [] }, 
  });
  
  export const CourseModel = mongoose.model<ICourse>("Course", CourseSchema);