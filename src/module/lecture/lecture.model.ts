import mongoose, { Schema } from "mongoose";
import { ILeecture } from "./lecture.interface";
import slugify from "slugify";

const LectureSchema = new Schema<ILeecture>(
  {
    slug: { type: String },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    moduleId: { type: Schema.Types.ObjectId, ref: "Module", required: true },
    title: { type: String, required: true },
    server: {
      type: String,
      enum: ["Youtube", "Vimeo", "Bunny", "Others"],
      default: "Youtube",
    },
    videoId: { type: String, required: true },
    duration: { type: Number, required: true },
    isFree: { type: Boolean },
    status: {
      type: String,
      enum: ["Published", "Drafted"],
      default: "Published",
    },
    tags: { type: [String], default: [] },
    deletedAt: { type: Date },
    scheduleDate: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  },
);

LectureSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// ✅ Middleware: findOneAndUpdate এর সময় Slug আপডেট হবে
LectureSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as Record<string, any>;
  if (update?.title) {
    update.slug = slugify(update.title, { lower: true, strict: true });
  }
  next();
});

const LectureModel = mongoose.model<ILeecture>("Lecture", LectureSchema);

export default LectureModel;
