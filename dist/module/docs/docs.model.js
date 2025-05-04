"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const generateSlug_1 = require("../../utils/generateSlug");
const docsSchema = new mongoose_1.Schema(
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
    const uniqueSlug = (0, generateSlug_1.generateUniqueSlug)(this.title);
    this.slug = uniqueSlug;
  }
  next();
});
const DocsModel = (0, mongoose_1.model)("Docs", docsSchema);
exports.default = DocsModel;
