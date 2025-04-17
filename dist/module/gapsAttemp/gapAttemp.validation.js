"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const GapAttempZodSchema = zod_1.z.object({
    studentId: zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
        message: "Invalid studentId format",
    }),
    examId: zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
        message: "Invalid examId format",
    }),
    score: zod_1.z.number().min(0, { message: "Score cannot be negative" }).max(100, {
        message: "Score cannot be greater than 100",
    }),
    totalMarks: zod_1.z
        .number()
        .min(1, { message: "Total marks must be greater than 0" }),
    attemptedAt: zod_1.z.date(),
});
