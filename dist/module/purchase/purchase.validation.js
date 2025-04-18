"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseValidation = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
const createPurchaseSchema = zod_1.z.object({
    body: zod_1.z.object({
        studentId: ObjectIdSchema,
        status: zod_1.z.enum(["Archive", "Course Out"], {
            required_error: "Status is required",
        }),
        paymentStatus: zod_1.z.enum(["Paid", "Pending", "Partial", "Refunded"], {
            required_error: "Payment status is required",
        }),
        purchaseToken: zod_1.z.string({ required_error: "Purchase token is required" }),
        subtotal: zod_1.z.number({ required_error: "Subtotal is required" }),
        discount: zod_1.z.number({ required_error: "Discount is required" }),
        charge: zod_1.z.number({ required_error: "Charge is required" }),
        totalAmount: zod_1.z.number({ required_error: "Total amount is required" }),
        discountReason: zod_1.z.string({ required_error: "Discount reason is required" }),
        issuedBy: ObjectIdSchema
    })
});
const updatePurchaseSchema = zod_1.z.object({
    body: zod_1.z.object({
        studentId: ObjectIdSchema.optional(),
        status: zod_1.z.enum(["Archive", "Course Out"], {
            required_error: "Status is required",
        }).optional(),
        paymentStatus: zod_1.z.enum(["Paid", "Pending", "Partial", "Refunded"], {
            required_error: "Payment status is required",
        }).optional(),
        purchaseToken: zod_1.z.string({ required_error: "Purchase token is required" }).optional(),
        subtotal: zod_1.z.number({ required_error: "Subtotal is required" }).optional(),
        discount: zod_1.z.number({ required_error: "Discount is required" }).optional(),
        charge: zod_1.z.number({ required_error: "Charge is required" }).optional(),
        totalAmount: zod_1.z.number({ required_error: "Total amount is required" }).optional(),
        discountReason: zod_1.z.string({ required_error: "Discount reason is required" }).optional(),
        issuedBy: ObjectIdSchema.optional()
    })
});
exports.purchaseValidation = {
    createPurchaseSchema,
    updatePurchaseSchema
};
