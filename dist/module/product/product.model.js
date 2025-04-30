"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const generateSlug_1 = require("../../utils/generateSlug");
const productSchema = new mongoose_1.Schema({
    slug: { type: String, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    trailer: { type: String },
    categoryId: { type: mongoose_1.Schema.Types.ObjectId, ref: "BookCategory", required: true },
    status: { type: String, enum: ["Active ", "Drafted"], required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, default: 0 },
    stock: { type: String, enum: ["In Stock", "Out Off Stock"], required: true },
    coverPhoto: { type: String, default: '' },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
    deletedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
}, {
    timestamps: {
        currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
});
productSchema.pre("save", function (next) {
    if (this.isModified("title")) {
        const uniqueSlug = (0, generateSlug_1.generateUniqueSlug)(this.title);
        this.slug = uniqueSlug;
    }
    next();
});
exports.ProductModel = (0, mongoose_1.model)("Product", productSchema);
