"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const paymentInfoSchema = new mongoose_1.Schema({
    transactionId: { type: String, required: true },
    method: {
        type: String,
        enum: ["Bkash", "Nagad", "Bank", "Cash"],
        required: true,
    },
    accountNumber: { type: String },
    paymentMedium: {
        type: String,
        enum: ["personal", "agent", "merchant"],
    },
    paymentDate: { type: Date },
    proofUrl: { type: String },
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
