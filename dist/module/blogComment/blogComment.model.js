"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
const blogCommentMongooseSchema = new mongoose_1.Schema(
  {
    slug: { type: String },
    userType: {
      type: String,
      required: true,
      enum: ["admin", "student", "teacher"],
    },
    userId: {
      type: mongoose_1.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    blogId: {
      type: mongoose_1.Schema.Types.ObjectId,
      required: true,
      ref: "Blog",
    },
    comment: { type: String, required: true },
    status: {
      type: String,
      enum: ["approved", "pending", "rejected"],
      default: "approved",
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
blogCommentMongooseSchema.pre("save", function (next) {
  if (this.isModified("comment")) {
    this.slug = (0, slugify_1.default)(this.comment, {
      lower: true,
      strict: true,
    });
  }
  next();
});
blogCommentMongooseSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update === null || update === void 0 ? void 0 : update.comment) {
    update.slug = (0, slugify_1.default)(update.comment, {
      lower: true,
      strict: true,
    });
  }
  next();
});
const BlogComment = (0, mongoose_1.model)(
  "BlogComment",
  blogCommentMongooseSchema,
);
exports.default = BlogComment;
