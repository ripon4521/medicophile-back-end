import mongoose, { Schema } from "mongoose";
import { IExam } from "./exam.interface";


const ExamSchema = new Schema<IExam>(
  {
    examTitle: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    examType: { type: String, enum: ["MCQ", "CQ", "Fill in the gaps"], required: true },
    TotalQuestion: { type: Number, required: true, min: 1 },
    positiveMark: { type: Number, required: true, min: 0 },
    negativeMark: { type: Number, required: true, min: 0 },
    duration: { type: Number, required: true, min: 1 }, // Duration in minutes
    launchingDate: { type: String, required: true }, // ISO date format
    validDate: { type: String, required: true }, // ISO date format
    status: { type: String, enum: ["published", "drafted"], required: true, default:'published' },
  },
  { timestamps: true }
);

const ExamModel = mongoose.model<IExam>("Exam", ExamSchema);

export default ExamModel;
