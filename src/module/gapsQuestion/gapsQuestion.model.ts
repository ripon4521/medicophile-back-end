import { model, Schema } from "mongoose";
import { IGapsQuestion } from "./gapsQuestion.interface";

const GapsQuestionSchema = new Schema<IGapsQuestion>(
  {
    examId: { type: Schema.Types.ObjectId, required: true, ref: "Exam" },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    question: { type: String, required: true },
    duration:{type:Number, required:true, },
    mark:{ type:Number, required:true, default:1},
    answer: { type: [String], required: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  }
);

const GapsQuestionModel = model<IGapsQuestion>(
  "GapsQuestion",
  GapsQuestionSchema
);

export default GapsQuestionModel;
