"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const generateSlug_1 = require("../../utils/generateSlug");
const BookCategorySchema = new mongoose_1.Schema({
    slug: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    description: {
        type: String,
        default: "",
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
        currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000)
    },
});
BookCategorySchema.pre("save", function (next) {
    if (this.isModified("name")) {
        const uniqueSlug = (0, generateSlug_1.generateUniqueSlug)(this.name);
        this.slug = uniqueSlug;
    }
    next();
});
const BookCategoryModel = (0, mongoose_1.model)("BookCategory", BookCategorySchema);
exports.default = BookCategoryModel;
