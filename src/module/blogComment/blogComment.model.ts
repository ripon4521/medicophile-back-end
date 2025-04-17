import { model, Schema } from "mongoose";
import { IBlogComment } from "./blogComment.interface";
import { string } from "zod";
import slugify from "slugify";

const blogCommentMongooseSchema = new Schema<IBlogComment>(
  {
    slug: { type: String },
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
    this.slug = slugify(this.comment, { lower: true, strict: true });
  }
  next();
});

blogCommentMongooseSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as Record<string, any>;
  if (update?.comment) {
    update.slug = slugify(update.comment, { lower: true, strict: true });
  }
  next();
});

const BlogComment = model<IBlogComment>(
  "BlogComment",
  blogCommentMongooseSchema,
);
export default BlogComment;
