"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseModel = void 0;
const mongoose_1 = require("mongoose");
const paymentInfoSchema = new mongoose_1.Schema({
    transactionId: { type: String, default: '' },
    method: {
        type: String,
        enum: ["Bkash", "Nagad", "Bank", "Cash", "Auto"],
        default: "Bikash"
    },
    accountNumber: { type: String, default: '' },
    paymentMedium: {
        type: String,
        enum: ["personal", "agent", "merchant"],
        default: "personal"
    },
    paymentDate: { type: Date, default: new Date(new Date().getTime() + 6 * 60 * 60 * 1000) },
    proofUrl: { type: String, default: '' },
}, { _id: false });
const PurchaseSchema = new mongoose_1.Schema({
    studentId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
    courseId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Course" },
    paymentInfo: { type: paymentInfoSchema },
    status: { type: String, enum: ["Archive", "Course Out", "Active"] },
    paymentStatus: {
        type: String,
        enum: ["Paid", "Pending", "Partial", "Refunded", "Rejected"],
        required: true,
    },
    purchaseToken: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "PurchaseToken" },
    subtotal: { type: Number },
    isExpire: { type: Boolean, default: false },
    discount: { type: Number },
    charge: { type: Number },
    totalAmount: { type: Number },
    issuedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
}, {
    timestamps: {
        currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
});
exports.PurchaseModel = (0, mongoose_1.model)("Purchase", PurchaseSchema);
