"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseModel = void 0;
const mongoose_1 = require("mongoose");
const PurchaseSchema = new mongoose_1.Schema({
    studentId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
    status: { type: String, enum: ["Archive", "Course Out"], required: true },
    paymentStatus: {
        type: String,
        enum: ["Paid", "Pending", "Partial", "Refunded"],
        required: true,
    },
    purchaseToken: { type: String, required: true },
    subtotal: { type: Number, required: true },
    discount: { type: Number, required: true },
    charge: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    discountReason: { type: String, required: true },
    issuedBy: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Admin" },
    isDeleted: { type: Boolean, required: true, default: false },
    deletedAt: { type: Date, default: null },
}, {
    timestamps: {
        currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }
});
exports.PurchaseModel = (0, mongoose_1.model)("Purchase", PurchaseSchema);
