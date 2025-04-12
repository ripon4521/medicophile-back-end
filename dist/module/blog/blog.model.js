"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
const blogSchema = new mongoose_1.Schema({
    slug: {
        type: String,
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
        this.slug = (0, slugify_1.default)(this.title, { lower: true, strict: true });
    }
    next();
});
blogSchema.pre("findOneAndUpdate", function (next) {
    const update = this.getUpdate();
    if (update === null || update === void 0 ? void 0 : update.title) {
        update.slug = (0, slugify_1.default)(update.title, { lower: true, strict: true });
    }
    next();
});
const BlogModel = (0, mongoose_1.model)("Blog", blogSchema);
exports.default = BlogModel;
