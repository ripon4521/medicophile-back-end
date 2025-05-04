"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const generateSlug_1 = require("../../utils/generateSlug");
const mediaSchema = new mongoose_1.Schema(
  {
    slug: {
      type: String,
      unique: true,
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
      type: mongoose_1.Schema.Types.ObjectId,
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
    const uniqueSlug = (0, generateSlug_1.generateUniqueSlug)(this.title);
    this.slug = uniqueSlug;
  }
  next();
});
const MediaModel = (0, mongoose_1.model)("Media", mediaSchema);
exports.default = MediaModel;
