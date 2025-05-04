"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfflineBatchModel = void 0;
const mongoose_1 = require("mongoose");
const generateSlug_1 = require("../../utils/generateSlug");
const offlineBatchSchema = new mongoose_1.Schema(
  {
    slug: { type: String, unique: true },
    name: { type: String, required: true },
    courseId: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
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
offlineBatchSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    const uniqueSlug = (0, generateSlug_1.generateUniqueSlug)(this.name);
    this.slug = uniqueSlug;
  }
  next();
});
exports.OfflineBatchModel = (0, mongoose_1.model)(
  "OfflineBatch",
  offlineBatchSchema,
);
