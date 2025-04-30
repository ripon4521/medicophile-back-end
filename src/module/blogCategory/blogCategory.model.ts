import mongoose, { Schema, Types } from "mongoose";
import slugify from "slugify";
import { generateUniqueSlug } from "../../utils/generateSlug";

const blogCategorySchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
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

blogCategorySchema.pre("save", function (next) {
  if (this.isModified("title")) {
    const uniqueSlug = generateUniqueSlug(this.title);
    this.slug = uniqueSlug;
  }
  next();
});

const BlogCategory = mongoose.model("BlogCategory", blogCategorySchema);
export default BlogCategory;
