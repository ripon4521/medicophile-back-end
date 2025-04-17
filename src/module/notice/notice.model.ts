import mongoose, { Schema, Document } from "mongoose";
import { Types } from "mongoose";
import { INotice } from "./notice.interface";
import slugify from "slugify";

// Define the Notice schema
const noticeSchema = new Schema<INotice>(
  {
    slug: {
      type: String,
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
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

noticeSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as Record<string, any>;
  if (update?.title) {
    update.slug = slugify(update.title, { lower: true, strict: true });
  }
  next();
});

const NoticeModel = mongoose.model<INotice>("Notice", noticeSchema);

export default NoticeModel;
