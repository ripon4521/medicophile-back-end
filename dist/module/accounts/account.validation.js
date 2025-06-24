"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateexpenseSchema = exports.createexpenseSchema = exports.salesSchema = exports.orderSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
exports.orderSchema = zod_1.z.object({
    body: zod_1.z.object({
        source: zod_1.z.literal("order"),
        orderId: ObjectIdSchema,
        customerId: ObjectIdSchema,
        amount: zod_1.z.number().nonnegative(),
    })
});
exports.salesSchema = zod_1.z.object({
    body: zod_1.z.object({
        source: zod_1.z.literal("sales"),
        purchaseId: ObjectIdSchema,
        customerId: ObjectIdSchema,
        amount: zod_1.z.number().nonnegative(),
    })
});
const optionalNonEmptyString = zod_1.z.union([zod_1.z.string().min(3), zod_1.z.literal("")]).optional();
exports.createexpenseSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1),
        description: optionalNonEmptyString,
        amount: zod_1.z.number().nonnegative(),
        category: zod_1.z.enum([
            "rent",
            "electricity",
            "internet",
            "salary",
            "transport",
            "others",
        ]),
        paymentMethod: zod_1.z.enum(["cash", "bkash", "nagad", "bank", "card"]),
        addedBy: ObjectIdSchema,
    })
});
exports.updateexpenseSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: optionalNonEmptyString,
        description: optionalNonEmptyString,
        amount: zod_1.z.number().nonnegative().optional(),
        category: zod_1.z.enum([
            "rent",
            "electricity",
            "internet",
            "salary",
            "transport",
            "others",
        ]).optional(),
        paymentMethod: zod_1.z.enum(["cash", "bkash", "nagad", "bank", "card"]).optional(),
    })
});
