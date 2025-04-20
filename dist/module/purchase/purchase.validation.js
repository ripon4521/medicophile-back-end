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
        paymentStatus: zod_1.z.enum(["Paid", "Pending", "Partial", "Refunded", "Rejected"]),
        purchaseToken: ObjectIdSchema,
        issuedBy: ObjectIdSchema,
    })
});
const updatePurchaseSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["Archive", "Course Out", "Active"]).optional(),
        paymentStatus: zod_1.z.enum(["Paid", "Pending", "Partial", "Refunded", "Rejected"]).optional(),
    })
});
exports.purchaseValidation = {
    createPurchaseSchema,
    updatePurchaseSchema
};
