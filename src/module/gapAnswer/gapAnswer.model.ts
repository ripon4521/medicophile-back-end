import mongoose, { Schema } from "mongoose";
import { IGapAnswer } from "./gapAnswer.interface";

const gapAnswerSchema = new Schema<IGapAnswer>({
  examId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Exam",
  },
  questionId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "GapsQuestion",
  },
  studentId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  answer: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
  },
},{
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  });

const GapAnswerModel = mongoose.model<IGapAnswer>("GapAnswer", gapAnswerSchema);

export default GapAnswerModel;
