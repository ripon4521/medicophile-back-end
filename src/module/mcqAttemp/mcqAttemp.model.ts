import mongoose, { Schema, model } from "mongoose";
import { IAttemp, IMcqAttemp } from "./mcqAttemp.interface";

const answerItemSchema = new Schema<IAttemp>(
  {
    questionId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "McqQuestion",
    },
    selectedAnswer: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const mcqAttemptSchema = new Schema<IMcqAttemp>(
  {
    answer: {
      type: [answerItemSchema],
      required: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    totalScore: {
      type: Number,
    },
    totalAttemp: {
      type: Number,
    },
    correctCount: { type: Number },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  },
);

const McqAttemptModel = model("McqAttempt", mcqAttemptSchema);

export default McqAttemptModel;
