"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const generateSlug_1 = require("../../utils/generateSlug");
const blogSchema = new mongoose_1.Schema({
    slug: {
        type: String,
        unique: true
    },
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "BlogCategory",
        required: [true, "Category ID is required"],
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "CreatedBy is required"],
    },
    tags: {
        type: [String],
        default: [],
    },
    status: {
        type: String,
        enum: ["Published", "Drafted"],
        required: [true, "Status is required"],
        default: "Published",
    },
    coverPhoto: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
    },
}, {
    timestamps: {
        currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
});
blogSchema.pre("save", function (next) {
    if (this.isModified("title")) {
        const uniqueSlug = (0, generateSlug_1.generateUniqueSlug)(this.title);
        this.slug = uniqueSlug;
    }
    next();
});
const BlogModel = (0, mongoose_1.model)("Blog", blogSchema);
exports.default = BlogModel;
