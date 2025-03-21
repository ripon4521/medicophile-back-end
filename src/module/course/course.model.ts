import mongoose, { Schema } from "mongoose";
import { ICourse } from "./course.interface";

const CourseSchema = new Schema<ICourse>({
  course_code: { type: String },
  cover_photo:{type:String , required:true},
  course_title: { type: String, required: true },
  course_type: { type: String, enum: ["online", "offline"], required:true },
  category: { type: String, required: true },
  duration: { type: String, required: true },
  takeReview: { type: String, enum: ["on", "off"], required: true },
  preOrder: { type: String, enum: ["on", "off"], required: true },
  status: { type: String, enum: ["active", "inactive"], required: true },
  totalAdmited: { type: Number, required: true },
  price: { type: Number, required: true },
  offerPrice: { type: Number, required: true },
  launchingDate: { type: String, required: true },
  course_tag: { type: String, required: true },
});

export const CourseModel = mongoose.model<ICourse>("Course", CourseSchema);
