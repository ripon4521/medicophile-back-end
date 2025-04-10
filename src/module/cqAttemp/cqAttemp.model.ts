import mongoose, { Schema, model } from "mongoose";
import { ICqAttemps } from "./cqAttemp.interface";

const cqAttempSchema = new Schema<ICqAttemps>(
  {
    studentId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    examId: { type: Schema.Types.ObjectId, required: true, ref: "Exam" },
    questionId: { type: Schema.Types.ObjectId, required: true, ref: "CqQuestions" },
    submitedPdf: { type: String },
    score: { type: Number},
    submissionStatus: {
      type: String,
      enum: ["In Time", "Late"],
     
    },

    submittedTime: { type: Date, default:new Date(new Date().getTime() + 6 * 60 * 60 * 1000) },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  }
);

const CqAttempModel = model<ICqAttemps>("CqAttemp", cqAttempSchema);

export default CqAttempModel;
