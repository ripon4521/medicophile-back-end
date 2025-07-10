import mongoose, { Model, Schema } from "mongoose";
import { ICourse } from "./course.interface";
import { generateUniqueSlug } from "../../utils/generateSlug";

const courseSchema = new Schema<ICourse>(
  {
    slug: { type: String, unique: true },
    prefix: { type: String, default: "" },
    cover_photo: { type: String, default: "" },
    course_title: { type: String, required: true },
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
    expireTime: { type: String, required: true },

    // ✅ timeShedule: array of objects with dynamic keys
    timeShedule: {
      type: [
        {
          type: Map,
          of: [String],
        },
      ],
      default: [],
    },

    price: { type: Number, required: true, min: 0 },
    offerPrice: { type: Number, default: 0 },
    takeReview: { type: String, enum: ["on", "off"], default: "on" },
    status: { type: String, enum: ["active", "inactive"], required: true },
    course_tag: { type: [String], default: [] },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  }
);

// ✅ Auto-generate slug before save
courseSchema.pre("save", function (next) {
  if (this.isModified("course_title")) {
    const uniqueSlug = generateUniqueSlug(this.course_title);
    this.slug = uniqueSlug;
  }
  next();
});

// ✅ Mongoose Model
const courseModel = mongoose.model<ICourse>("Course", courseSchema);
export default courseModel;
