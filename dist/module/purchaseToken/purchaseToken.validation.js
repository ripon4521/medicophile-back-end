"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseTokenValidation = exports.paymentInfoSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
// Reusable ObjectId Schema
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
// Helper schemas for flexible updates
const optionalObjectId = zod_1.z.union([ObjectIdSchema, zod_1.z.literal("")]).optional();
const optionalString = (msg) => zod_1.z.union([zod_1.z.string().min(1, msg), zod_1.z.literal("")]).optional();
const optionalNumber = (msg) => zod_1.z.union([zod_1.z.number(), zod_1.z.literal("")]).optional();
const requiredString = (msg) => zod_1.z.string({ required_error: msg });
const requiredNumber = (msg) => zod_1.z.number({ required_error: msg });
// Payment Info Schema
exports.paymentInfoSchema = zod_1.z.object({
    transactionId: optionalString("Transaction ID is required"),
    method: zod_1.z.enum(["Bkash", "Nagad", "Bank", "Cash"]).optional(),
    accountNumber: optionalString("Account number is required"),
    paymentMedium: zod_1.z.enum(["personal", "agent", "merchant"]).optional(),
    proofUrl: zod_1.z.string().url("Invalid proof URL").optional(),
});
// Create PurchaseToken Schema
const createPurchaseTokenSchema = zod_1.z.object({
    body: zod_1.z.object({
        studentId: optionalObjectId,
        courseId: ObjectIdSchema,
        ref: optionalObjectId,
        coupon: zod_1.z.string().optional(),
        price: optionalNumber("Price is required"),
        subtotal: optionalNumber("Subtotal is required"),
        discount: optionalNumber("Discount is required"),
        charge: optionalNumber("Charge is required"),
        totalAmount: optionalNumber("Total amount is required"),
        paymentInfo: exports.paymentInfoSchema.optional(),
        name: requiredString("Name is required"),
        phone: requiredString("Phone is required"),
    }),
});
// Update PurchaseToken Schema
const updatePurchaseTokenSchema = zod_1.z.object({
    body: zod_1.z.object({
        studentId: optionalObjectId,
        courseId: optionalObjectId,
        status: zod_1.z.enum(["Verified", "Unverified", "Rejected"]).optional(),
        purchaseToken: optionalString("Purchase token is required"),
        coupon: zod_1.z.string().optional(),
        price: optionalNumber("Price is required"),
        subtotal: optionalNumber("Subtotal is required"),
        discount: optionalNumber("Discount is required"),
        charge: optionalNumber("Charge is required"),
        totalAmount: optionalNumber("Total amount is required"),
        issuedBy: optionalObjectId,
        paymentInfo: exports.paymentInfoSchema.optional(),
        name: optionalString("Name is required"),
        phone: optionalString("Phone is required"),
    }),
});
exports.purchaseTokenValidation = {
    createPurchaseTokenSchema,
    updatePurchaseTokenSchema,
};
