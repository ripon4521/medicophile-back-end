import mongoose, { Schema, Types } from "mongoose";
import slugify from "slugify";

const courseCategorySchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    cover_photo: { type: String, required: true },
    createdBy: { type: Types.ObjectId, ref: "User", required: true },
    deletedAt: { type: Date, default: null },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

courseCategorySchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const CourseCategory = mongoose.model("CourseCategory", courseCategorySchema);
export default CourseCategory;
