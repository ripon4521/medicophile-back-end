import mongoose, { Schema, Types } from "mongoose";
import limax from "limax";
import { generateUniqueSlug } from "../../utils/generateSlug";

const courseCategorySchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String },
    cover_photo: { type: String, required: true },
    createdBy: { type: Types.ObjectId, ref: "User", required: true },
    deletedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  },
);

// ✅ Slug generate with fallback for Bangla
courseCategorySchema.pre("save", function (next) {
  if (this.isModified("title")) {
    // Use the utility function to generate slug
    const uniqueSlug = generateUniqueSlug(this.title);

    this.slug = uniqueSlug; // Set the slug field with generated slug
    console.log("✅ Generated Slug:", this.slug);
  }

  next();
});

const CourseCategory = mongoose.model("CourseCategory", courseCategorySchema);
export default CourseCategory;
