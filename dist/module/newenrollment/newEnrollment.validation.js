"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrolemntValidation = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
const optionalNonEmptyString = zod_1.z.union([zod_1.z.string().min(1), zod_1.z.literal("")]).optional();
const createEnrollmentSchema = zod_1.z.object({
    body: zod_1.z.object({
        courseId: ObjectIdSchema,
        paidAmont: zod_1.z
            .number()
            .min(0, "Paid amount must be greater than or equal to 0"),
        discount: zod_1.z
            .number()
            .min(0, "Paid amount must be greater than or equal to 0"),
        due: zod_1.z
            .number()
            .min(0, "Paid amount must be greater than or equal to 0"),
        paymentMethod: zod_1.z.enum(["cash", "bikash", "nagad", "roket"]),
        paymentNumber: optionalNonEmptyString,
        transctionId: optionalNonEmptyString,
        discountReason: optionalNonEmptyString,
        name: zod_1.z.string().min(1, "Name cannot be empty."),
        phone: zod_1.z
            .string()
            .regex(/^\+?(88)?01[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),
    }),
});
const updateEnrollmentSchema = zod_1.z.object({
    body: zod_1.z.object({
        paidAmont: zod_1.z
            .number()
            .min(0, "Paid amount must be greater than or equal to 0").optional(),
        discount: zod_1.z
            .number()
            .min(0, "Paid amount must be greater than or equal to 0").optional(),
        paymentMethod: zod_1.z.enum(["cash", "bikash", "nagad", "roket"]).optional(),
        paymentNumber: optionalNonEmptyString,
        transctionId: optionalNonEmptyString,
        discountReason: optionalNonEmptyString,
        status: zod_1.z.enum(["active", "blocked"]).optional(),
    }),
});
exports.enrolemntValidation = {
    createEnrollmentSchema,
    updateEnrollmentSchema,
};
