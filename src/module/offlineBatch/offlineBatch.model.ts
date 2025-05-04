import { Schema, model, Document, Types } from "mongoose";
import { IOfflineBatch } from "./offlineBatch.interface";
import { generateUniqueSlug } from "../../utils/generateSlug";

const offlineBatchSchema = new Schema<IOfflineBatch>(
  {
    slug: { type: String, unique: true },
    name: { type: String, required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  },
);

offlineBatchSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    const uniqueSlug = generateUniqueSlug(this.name);
    this.slug = uniqueSlug;
  }
  next();
});

export const OfflineBatchModel = model<IOfflineBatch>(
  "OfflineBatch",
  offlineBatchSchema,
);
