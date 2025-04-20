import mongoose, { Schema, Types } from "mongoose";
import slugify from "slugify";

const courseCategorySchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    cover_photo: { type: String, required: true },
    createdBy: { type: Types.ObjectId, ref: "User", required: true },
    deletedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, // UTC+6 (Bangladesh Time)
  },
);

// ✅ Middleware: Save করার সময় Slug অটো জেনারেট হবে
courseCategorySchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// // ✅ Middleware: findOneAndUpdate এর সময় Slug আপডেট হবে
// courseCategorySchema.pre("findOneAndUpdate", function (next) {
//   const update = this.getUpdate() as Record<string, any>;
//   if (update?.title) {
//     update.slug = slugify(update.title, { lower: true, strict: true });
//   }
//   next();
// });

const CourseCategory = mongoose.model("CourseCategory", courseCategorySchema);
export default CourseCategory;
