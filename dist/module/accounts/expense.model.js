"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseModel = void 0;
// models/expense.model.ts
const mongoose_1 = require("mongoose");
const generateSlug_1 = require("../../utils/generateSlug");
const expenseSchema = new mongoose_1.Schema({
    slug: { type: String, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    amount: { type: Number, required: true },
    category: {
        type: String,
        enum: ["rent", "electricity", "internet", "salary", "transport", "others"],
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ["cash", "bkash", "nagad", "bank", "card"],
        required: true,
    },
    addedBy: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
}, {
    timestamps: {
        currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
});
expenseSchema.pre("save", function (next) {
    if (this.isModified("title")) {
        const uniqueSlug = (0, generateSlug_1.generateUniqueSlug)(this.title);
        this.slug = uniqueSlug;
    }
    next();
});
exports.ExpenseModel = (0, mongoose_1.model)("Expense", expenseSchema);
