import mongoose, { Model, Schema } from "mongoose";
import { ICourse } from "./course.interface";
import slugify from "slugify";

const courseSchema = new Schema<ICourse>(
  {
    slug: { type: String, unique:true },
    cover_photo: { type: String, required: true },
    course_title: { type: String, required: true , unique:true},
    description: { type: String, required: true },
    duration: { type: String, required: true },
    preOrder: { type: String, enum: ["on", "off"], required: true },
    course_type: { type: String, enum: ["online", "offline"], required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "CourseCategory",
      required: true,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    expireTime: { type: Date, required: true },
    daySchedule: { type: [String], required: true },
    timeShedule: { type: [String], required: true },
    price: { type: Number, required: true, min: 0 },
    offerPrice: { type: Number, required: true, min: 0 },
    takeReview: { type: String, enum: ["on", "off"], required: true },
    status: { type: String, enum: ["active", "inactive"], required: true },
    course_tag: { type: [String], required: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date},
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, // UTC+6 (Bangladesh Time)
  },
);

courseSchema.pre("save", function (next) {
  if (this.isModified("course_title")) {
    this.slug = slugify(this.course_title, { lower: true, strict: true });
  }
  next();
});

// ✅ Middleware: findOneAndUpdate এর সময় Slug আপডেট হবে
courseSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as Record<string, any>;
  if (update?.course_title) {
    update.slug = slugify(update.course_title, { lower: true, strict: true });
  }
  next();
});

// Create Mongoose model
const courseModel = mongoose.model<ICourse>("Course", courseSchema);

export default courseModel;
