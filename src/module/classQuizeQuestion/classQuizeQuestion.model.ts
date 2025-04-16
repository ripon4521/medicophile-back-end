import mongoose, { Schema } from "mongoose";
import { ICqQuestion } from "./classQuizeQuestion.interface";

const CqQuestionSchema = new Schema<ICqQuestion>(
  {
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Exam",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    question: { type: String, required: true },
    status: { type: String, enum: ["Published", "Drafted"], required: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  },
);

const CqQuestionModel = mongoose.model<ICqQuestion>(
  "CqQuestion",
  CqQuestionSchema,
);

export default CqQuestionModel;
