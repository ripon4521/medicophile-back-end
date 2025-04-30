import mongoose, { Schema, Document } from "mongoose";
import { Types } from "mongoose";
import { INotice } from "./notice.interface";
import slugify from "slugify";
import { generateUniqueSlug } from "../../utils/generateSlug";

// Define the Notice schema
const noticeSchema = new Schema<INotice>(
  {
    slug: {
      type: String,
      unique:true
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expiresAt: {
      type: Date,
    },
    scheduleDate: {
      type: Date,
    },
    isExpire: {
      type: Boolean,
      default: false,
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

noticeSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    const uniqueSlug = generateUniqueSlug(this.title);
    this.slug = uniqueSlug; 
  }
  next();
});



const NoticeModel = mongoose.model<INotice>("Notice", noticeSchema);

export default NoticeModel;
