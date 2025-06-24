"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GapAttempZodSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
// Reusable ObjectId schema
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
// Gap Attempt Schema
const GapAttempZodSchema = zod_1.z.object({
    studentId: ObjectIdSchema,
    examId: ObjectIdSchema,
    score: zod_1.z
        .number()
        .min(0, { message: "Score cannot be negative" })
        .max(100, { message: "Score cannot be greater than 100" }),
    totalMarks: zod_1.z.number().min(1, { message: "Total marks must be greater than 0" }),
    attemptedAt: zod_1.z.coerce.date({
        errorMap: () => ({ message: "Attempted time must be a valid date" }),
    }),
});
exports.GapAttempZodSchema = GapAttempZodSchema;
