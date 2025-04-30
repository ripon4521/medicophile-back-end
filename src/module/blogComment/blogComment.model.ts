import { model, Schema } from "mongoose";
import { IBlogComment } from "./blogComment.interface";
import { string } from "zod";
import slugify from "slugify";
import { generateUniqueSlug } from "../../utils/generateSlug";

const blogCommentMongooseSchema = new Schema<IBlogComment>(
  {
    slug: { type: String, unique:true },
    userType: {
      type: String,
      required: true,
      enum: ["admin", "student", "teacher"],
    },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    blogId: { type: Schema.Types.ObjectId, required: true, ref: "Blog" },
    comment: { type: String, required: true },
    status: {
      type: String,
      enum: ["approved", "pending", "rejected"],
      default: "approved",
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  },
);
blogCommentMongooseSchema.pre("save", function (next) {
  if (this.isModified("comment")) {
    const uniqueSlug = generateUniqueSlug(this.comment);
    this.slug = uniqueSlug; 
  }
  next();
});



const BlogComment = model<IBlogComment>(
  "BlogComment",
  blogCommentMongooseSchema,
);
export default BlogComment;
