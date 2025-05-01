"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderDetailsSchema = new mongoose_1.Schema({
    orderId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Order", required: true },
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    name: { type: String },
    phone: { type: String },
    address: { type: String },
    price: { type: Number, required: true },
    paymentInfo: {
        transactionId: { type: String, required: true },
        method: {
            type: String,
            enum: ["Bkash", "Nagad", "Bank", "Cash"],
            required: true,
        },
        accountNumber: { type: String },
        medium: { type: String, enum: ["personal", "agent", "merchant"] },
        paymentDate: { type: Date },
        proofUrl: { type: String },
    },
    status: {
        type: String,
        enum: ["Refunded", "Delivered", "Courier"],
    },
    paymentStatus: {
        type: String,
        enum: ["Paid", "Pending", "Refunded"],
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
}, {
    timestamps: {
        currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
});
const OrderDetailsModel = (0, mongoose_1.model)("OrderDetails", orderDetailsSchema);
exports.default = OrderDetailsModel;
