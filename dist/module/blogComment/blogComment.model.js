"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const generateSlug_1 = require("../../utils/generateSlug");
const blogCommentMongooseSchema = new mongoose_1.Schema({
    slug: { type: String, unique: true },
    userType: {
        type: String,
        required: true,
        enum: ["admin", "student", "teacher"],
    },
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
    blogId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Blog" },
    comment: { type: String, required: true },
    status: {
        type: String,
        enum: ["approved", "pending", "rejected"],
        default: "approved",
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
}, {
    timestamps: {
        currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
});
blogCommentMongooseSchema.pre("save", function (next) {
    if (this.isModified("comment")) {
        const uniqueSlug = (0, generateSlug_1.generateUniqueSlug)(this.comment);
        this.slug = uniqueSlug;
    }
    next();
});
const BlogComment = (0, mongoose_1.model)("BlogComment", blogCommentMongooseSchema);
exports.default = BlogComment;
