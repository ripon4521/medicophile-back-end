"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidation = exports.paymentInfoSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
// Helpers
const optionalObjectId = ObjectIdSchema.optional();
const optionalNonEmptyString = zod_1.z.union([zod_1.z.string().min(1), zod_1.z.literal("")]).optional();
const optionalURL = zod_1.z.union([zod_1.z.string().url("Invalid URL"), zod_1.z.literal("")]).optional();
const optionalPhoneString = zod_1.z.union([zod_1.z.string().min(10), zod_1.z.literal("")]).optional();
const optionalStatus = zod_1.z.union([
    zod_1.z.enum(["Pending", "Processing", "Courier", "Delivered"]),
    zod_1.z.literal(""),
]).optional();
const optionalPaymentStatus = zod_1.z.union([
    zod_1.z.enum(["Paid", "Pending", "Refunded"]),
    zod_1.z.literal(""),
]).optional();
// Payment Info Schema
exports.paymentInfoSchema = zod_1.z.object({
    transactionId: zod_1.z.union([zod_1.z.string().min(1, "Transaction ID is required"), zod_1.z.literal("")]),
    method: zod_1.z.enum(["Bkash", "Nagad", "Bank", "Cash"]),
    accountNumber: optionalNonEmptyString,
    medium: zod_1.z.enum(["personal", "agent", "merchant"]).optional(),
    paymentDate: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid payment date",
    }),
    proofUrl: optionalURL,
});
const createOrderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        phone: zod_1.z.string().min(10, "Phone number must be at least 10 digits"),
        address: optionalNonEmptyString,
        paymentInfo: exports.paymentInfoSchema.optional(),
        paymentStatus: optionalPaymentStatus,
        subTotal: zod_1.z.number().min(0),
        discount: zod_1.z.number().min(0).optional(),
        coupoun: ObjectIdSchema.optional(),
        productId: ObjectIdSchema,
        userId: optionalObjectId,
        charge: zod_1.z.number().min(0).optional(),
        shiping: zod_1.z.number().min(0),
        quantity: zod_1.z.number().min(0),
        totalAmount: zod_1.z.number().min(0),
        paidAmount: zod_1.z.number().min(0),
    }),
});
const updateOrderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: optionalNonEmptyString,
        phone: optionalPhoneString,
        address: optionalNonEmptyString,
        status: optionalStatus,
    }),
});
exports.orderValidation = {
    createOrderZodSchema,
    updateOrderZodSchema,
};
