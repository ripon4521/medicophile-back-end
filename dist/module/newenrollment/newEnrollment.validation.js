"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrolemntValidation = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
const createEnrollmentSchema = zod_1.z.object({
    body: zod_1.z.object({
        studentId: ObjectIdSchema,
        courseId: ObjectIdSchema,
        paidAmont: zod_1.z
            .number()
            .min(0, "Paid amount must be greater than or equal to 0"),
        paymentMethod: zod_1.z.enum(["cash", "bikash", "nagad", "roket"]),
        status: zod_1.z.enum(["active", "blocked"]),
        paymentNumber: zod_1.z.string().optional(),
        transctionId: zod_1.z.string().optional(),
    }),
});
const updateEnrollmentSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["active", "blocked"]).optional(),
    }),
});
exports.enrolemntValidation = {
    createEnrollmentSchema,
    updateEnrollmentSchema,
};
