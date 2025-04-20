import { Schema, model, Types } from "mongoose";
import { IMedia } from "./media.interface";
import slugify from "slugify";

const mediaSchema = new Schema<IMedia>(
  {
    slug: {
      type: String,
      unique:true
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    media: {
      type: String,
      required: [true, "Media URL is required"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: [true, "CreatedBy is required"],
      ref: "User",
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

mediaSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// mediaSchema.pre("findOneAndUpdate", function (next) {
//   const update = this.getUpdate() as Record<string, any>;
//   if (update?.title) {
//     update.slug = slugify(update.title, { lower: true, strict: true });
//   }
//   next();
// });

const MediaModel = model<IMedia>("Media", mediaSchema);
export default MediaModel;
