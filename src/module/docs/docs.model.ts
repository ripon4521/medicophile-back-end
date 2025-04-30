import { Schema, model } from "mongoose";
import { IDocs } from "./docs.interface";
import slugify from "slugify";
import { generateUniqueSlug } from "../../utils/generateSlug";

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
    const uniqueSlug = generateUniqueSlug(this.title);
    this.slug = uniqueSlug; 
  }
  next();
});

const DocsModel = model<IDocs>("Docs", docsSchema);

export default DocsModel;
