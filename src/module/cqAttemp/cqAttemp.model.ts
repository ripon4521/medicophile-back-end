import mongoose, { Schema, model } from "mongoose";
import { ICqAttemps } from "./cqAttemp.interface";

const cqAttempSchema = new Schema<ICqAttemps>(
  {
    studentId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    examId: { type: Schema.Types.ObjectId, required: true, ref: "Exam" },
    checkedBy: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    submitedPdf: { type: String, required: true },
    score: { type: Number, required: true },
    submissionStatus: {
      type: String,
      enum: ["In Time", "Late"],
      required: true,
    },
    startTime: { type: Date },
    submittedTime: { type: Date },
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
