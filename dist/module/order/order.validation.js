"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidation = exports.paymentInfoSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
// Payment Info Schema (Assuming basic structure – customize if needed)
exports.paymentInfoSchema = zod_1.z.object({
    transactionId: zod_1.z.string().min(1, "Transaction ID is required"),
    method: zod_1.z.enum(["Bkash", "Nagad", "Bank", "Cash"]),
    accountNumber: zod_1.z.string().optional(),
    medium: zod_1.z.enum(["personal", "agent", "merchant"]).optional(),
    paymentDate: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid payment date",
    }),
    proofUrl: zod_1.z.string().url("Invalid proof URL").optional(),
});
const createOrderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        phone: zod_1.z.string(),
        address: zod_1.z.string().min(1, "Address is required"),
        paymentInfo: exports.paymentInfoSchema,
        subTotal: zod_1.z.number().min(0),
        discount: zod_1.z.number().min(0).optional(),
        coupoun: ObjectIdSchema.optional(),
        productId: ObjectIdSchema,
        charge: zod_1.z.number().min(0).optional(),
        shiping: zod_1.z.number().min(0),
        quantity: zod_1.z.number().min(0),
        totalAmount: zod_1.z.number().min(0),
        paidAmount: zod_1.z.number().min(0),
    }),
});
const updateOrderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required").optional(),
        phone: zod_1.z.number().min(1000000000, "Invalid phone number").optional(),
        address: zod_1.z.string().min(1, "Address is required").optional(),
    }),
});
exports.orderValidation = {
    createOrderZodSchema,
    updateOrderZodSchema
};
