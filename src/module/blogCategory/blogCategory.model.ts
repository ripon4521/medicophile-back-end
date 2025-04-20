import mongoose, { Schema, Types } from "mongoose";
import slugify from "slugify";

const blogCategorySchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique:true },
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
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// blogCategorySchema.pre("findOneAndUpdate", function (next) {
//   const update = this.getUpdate() as Record<string, any>;
//   if (update?.title) {
//     update.slug = slugify(update.title, { lower: true, strict: true });
//   }
//   next();
// });

const BlogCategory = mongoose.model("BlogCategory", blogCategorySchema);
export default BlogCategory;
