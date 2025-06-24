"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeModel = void 0;
// models/order.model.ts
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    source: { type: String, enum: ["order"], default: "order" },
    orderId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Order" },
    customerId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
    amount: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
}, {
    timestamps: {
        currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
});
exports.IncomeModel = (0, mongoose_1.model)("OrderIncome", orderSchema);
