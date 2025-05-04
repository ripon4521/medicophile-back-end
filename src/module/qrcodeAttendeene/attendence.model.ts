import { Schema, model, Types } from "mongoose";
import { IAttendence } from "./attendence.interface";

const attendanceSchema = new Schema<IAttendence>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    insertTime: {
      type: Date,
      default: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
    batchStudent: {
      type: Schema.Types.ObjectId,
      ref: "BatchStudent",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  },
);

const Attendence = model("Attendence", attendanceSchema);

export default Attendence;
