

import { Schema, model, Types } from "mongoose";
import { IBlog } from "./blog.interface";
import slugify from "slugify";


const blogSchema = new Schema<IBlog>(
  {
    slug: {
      type: String,
    
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "BlogCategory", 
      required: [true, "Category ID is required"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User", 
      required: [true, "CreatedBy is required"],
    },
    tags: {
      type: [String],
      default:[]
    },
    status: {
      type: String,
      enum: ["Published", "Drafted"],
      required: [true, "Status is required"],
      default:"Published"
    },
    coverPhoto: {
      type: String,
     
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  },
);



blogSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});


blogSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as Record<string, any>;
  if (update?.title) {
    update.slug = slugify(update.title, { lower: true, strict: true });
  }
  next();
});

 const BlogModel = model<IBlog>("Blog", blogSchema);
export default  BlogModel;