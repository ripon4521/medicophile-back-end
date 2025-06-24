"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, default: '' },
    status: {
        type: String,
        enum: ["Processing", "Courier", "Delivered", "Cancel"],
        default: "Processing",
    },
    paymentStatus: {
        type: String,
        enum: ["Paid"],
        default: "Paid"
    },
    paymentInfo: {
        transactionId: { type: String },
        method: {
            type: String,
            enum: ["Bkash", "Nagad", "Bank", "Cash"],
        },
        accountNumber: { type: String },
        medium: { type: String, enum: ["personal", "agent", "merchant"] },
        paymentDate: { type: Date },
        proofUrl: { type: String },
    },
    subTotal: { type: Number, required: true },
    discount: { type: Number },
    coupoun: { type: mongoose_1.Schema.Types.ObjectId, ref: "Coupon" },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product" },
    charge: { type: Number },
    shiping: { type: Number, required: true },
    quantity: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    paidAmount: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
}, {
    timestamps: {
        currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
});
const OrderModel = (0, mongoose_1.model)("Order", orderSchema);
exports.default = OrderModel;
