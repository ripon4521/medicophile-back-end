import { Schema, model, Document, Types } from "mongoose";
import { IBatchStudent } from "./batchStudent.interface";

const batchStudentSchema = new Schema<IBatchStudent>(
  {
    batchId: {
      type: Schema.Types.ObjectId,
      ref: "OfflineBatch",
      required: true,
    },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  },
);

export const BatchStudentModel = model<IBatchStudent>(
  "BatchStudent",
  batchStudentSchema,
);
