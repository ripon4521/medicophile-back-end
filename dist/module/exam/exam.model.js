"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const slugify_1 = __importDefault(require("slugify"));
const ExamSchema = new mongoose_1.Schema({
    slug: { type: String },
    examTitle: { type: String, required: true },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Course" },
    moduleId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Module" },
    examType: {
        type: String,
        enum: ["MCQ", "CQ", "Fill in the gaps"],
        required: true,
    },
    totalQuestion: { type: Number, required: true },
    positiveMark: { type: Number, required: true },
    negativeMark: { type: Number, required: true },
    mcqDuration: { type: Number, required: true },
    cqMark: { type: Number, required: true },
    resultStatus: {
        type: String,
        enum: ["pending", "completed", "failed"],
        required: true,
    },
    validTime: { type: String, required: true },
    status: { type: String, enum: ["published", "drafted"], required: true },
    deletedAt: { type: Date, default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: {
        currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, // UTC+6 (Bangladesh Time)
});
ExamSchema.pre("save", function (next) {
    if (this.isModified("examTitle")) {
        this.slug = (0, slugify_1.default)(this.examTitle, { lower: true, strict: true });
    }
    next();
});
ExamSchema.pre("findOneAndUpdate", function (next) {
    const update = this.getUpdate();
    if (update === null || update === void 0 ? void 0 : update.examTitle) {
        update.slug = (0, slugify_1.default)(update.examTitle, { lower: true, strict: true });
    }
    next();
});
const ExamModel = mongoose_1.default.model("Exam", ExamSchema);
exports.default = ExamModel;
