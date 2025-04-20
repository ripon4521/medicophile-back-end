"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
const liveClassSchema = new mongoose_1.Schema({
    slug: {
        type: String,
        unique: true
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
        this.slug = (0, slugify_1.default)(this.title, { lower: true, strict: true });
    }
    next();
});
// liveClassSchema.pre("findOneAndUpdate", function (next) {
//   const update = this.getUpdate() as Record<string, any>;
//   if (update?.title) {
//     update.slug = slugify(update.title, { lower: true, strict: true });
//   }
//   next();
// });
const LiveClassModel = (0, mongoose_1.model)("LiveClass", liveClassSchema);
exports.default = LiveClassModel;
