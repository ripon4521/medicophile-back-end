import mongoose, { Schema, Types } from "mongoose";
import { IExam } from "./exam.interface";
import slugify from "slugify";

const ExamSchema = new Schema<IExam>(
  {
    slug: { type: String },
    examTitle: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, required: true, ref: "Course" },
    moduleId: { type: Schema.Types.ObjectId, required: true, ref: "Module" },
    examType: {
      type: String,
      enum: ["MCQ", "CQ", "Fill in the gaps"],
      required: true,
    },
    totalQuestion: { type: Number, default: 0 },
    positiveMark: { type: Number, default: 0 },
    negativeMark: { type: Number, default: 0 },
    mcqDuration: { type: Number, default: 0 },
    cqMark: { type: Number, default: 0 },
    resultStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
    },
    validTime: { type: Date },
    status: { type: String, enum: ["published", "drafted"], required: true },
    scheduleDate: { type: Date },
    deletedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, // UTC+6 (Bangladesh Time)
  },
);

ExamSchema.pre("save", function (next) {
  if (this.isModified("examTitle")) {
    this.slug = slugify(this.examTitle, { lower: true, strict: true });
  }
  next();
});

ExamSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as Record<string, any>;
  if (update?.examTitle) {
    update.slug = slugify(update.examTitle, { lower: true, strict: true });
  }
  next();
});

const ExamModel = mongoose.model<IExam>("Exam", ExamSchema);

export default ExamModel;
