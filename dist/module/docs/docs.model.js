"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
const docsSchema = new mongoose_1.Schema({
    slug: { type: String, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    document: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
}, {
    timestamps: {
        currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
});
docsSchema.pre("save", function (next) {
    if (this.isModified("title")) {
        this.slug = (0, slugify_1.default)(this.title, { lower: true, strict: true });
    }
    next();
});
// ✅ Middleware: findOneAndUpdate এর সময় Slug আপডেট হবে
docsSchema.pre("findOneAndUpdate", function (next) {
    const update = this.getUpdate();
    if (update === null || update === void 0 ? void 0 : update.title) {
        update.slug = (0, slugify_1.default)(update.title, { lower: true, strict: true });
    }
    next();
});
const DocsModel = (0, mongoose_1.model)("Docs", docsSchema);
exports.default = DocsModel;
