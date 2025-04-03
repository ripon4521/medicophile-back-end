import mongoose, { Schema } from "mongoose";
import { IDuraction, ILeecture } from "./lecture.interface";

const DurationSchema = new Schema<IDuraction>({
  hour: { type: Number, required: true, min: 0 },
  minute: { type: Number, required: true, min: 0 },
  second: { type: Number, required: true, min: 0 },
});

const LectureSchema = new Schema<ILeecture>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    lectureTitle: { type: String, required: true },
    description: { type: String },
    serveer: { type: String, required: true },
    videoLink: { type: String, required: true },
    duration: { type: DurationSchema, required: true },
    isFree: { type: String, enum: ["yes", "no"], required: true },
    status: { type: String, enum: ["published", "drafted"], required: true },
    sheduleDate: { type: String, required: true },
  },
  { timestamps: true },
);

const LectureModel = mongoose.model<ILeecture>("Lecture", LectureSchema);

export default LectureModel;
