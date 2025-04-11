import { Schema, model } from "mongoose";
import { IDocs } from "./docs.interface";
import slugify from "slugify";

const docsSchema = new Schema<IDocs>(
  {
    slug: { type: String, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    document: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  },
);

docsSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// ✅ Middleware: findOneAndUpdate এর সময় Slug আপডেট হবে
docsSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as Record<string, any>;
  if (update?.title) {
    update.slug = slugify(update.title, { lower: true, strict: true });
  }
  next();
});

const DocsModel = model<IDocs>("Docs", docsSchema);

export default DocsModel;
