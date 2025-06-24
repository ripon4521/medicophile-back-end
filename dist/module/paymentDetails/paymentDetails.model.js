"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const PaymentDetailsSchema = new mongoose_1.Schema({
    purchaseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Purchase",
    },
    studentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    paidAmount: {
        type: Number,
    },
    paymentInfo: { type: paymentInfoSchema },
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
const PaymentDetailsModel = (0, mongoose_1.model)("PaymentDetails", PaymentDetailsSchema);
exports.default = PaymentDetailsModel;
