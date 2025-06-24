"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesModel = void 0;
// models/sales.model.ts
const mongoose_1 = require("mongoose");
const salesSchema = new mongoose_1.Schema({
    source: { type: String, enum: ["sales"], default: "sales" },
    purchaseId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Purchase" },
    customerId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
    amount: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
}, {
    timestamps: {
        currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
});
exports.SalesModel = (0, mongoose_1.model)("SalesIncome", salesSchema);
