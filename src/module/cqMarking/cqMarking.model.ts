import { Schema, model, Types } from "mongoose";
import { ICqMarking } from "./cqMarking.interface";
import mongoose from 'mongoose';


const cqMarkingSchema = new Schema<ICqMarking>(
  {
    studentId: { type:mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    examId: { type:mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
    questionId: { type:mongoose.Schema.Types.ObjectId, ref: "CqQuestion", required: true },
    score: { type: Number, required: true, min: 0 },
    comment: { type: String, default: "" },
    isDeleted: { type: Boolean, default:false },
    deletedAt: { type: Date},
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  }
);

 const CqMarkingModel = model<ICqMarking>("CqMarking", cqMarkingSchema);

 export default CqMarkingModel;
