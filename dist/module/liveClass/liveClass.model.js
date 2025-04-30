"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const generateSlug_1 = require("../../utils/generateSlug");
const liveClassSchema = new mongoose_1.Schema({
    slug: {
        type: String,
        unique: true,
    },
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Course ID is required"],
        ref: "Course",
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "CreatedBy is required"],
        ref: "User",
    },
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Published", "Drafted"],
        required: [true, "Status is required"],
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
liveClassSchema.pre("save", function (next) {
    if (this.isModified("title")) {
        const uniqueSlug = (0, generateSlug_1.generateUniqueSlug)(this.title);
        this.slug = uniqueSlug;
    }
    next();
});
const LiveClassModel = (0, mongoose_1.model)("LiveClass", liveClassSchema);
exports.default = LiveClassModel;
