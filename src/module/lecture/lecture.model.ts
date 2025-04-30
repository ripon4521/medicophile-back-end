import mongoose, { Schema } from "mongoose";
import { ILeecture } from "./lecture.interface";
import slugify from "slugify";
import { generateUniqueSlug } from "../../utils/generateSlug";

const LectureSchema = new Schema<ILeecture>(
  {
    slug: { type: String, unique: true },
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
    const uniqueSlug = generateUniqueSlug(this.title);
    this.slug = uniqueSlug;
  }
  next();
});

const LectureModel = mongoose.model<ILeecture>("Lecture", LectureSchema);

export default LectureModel;
