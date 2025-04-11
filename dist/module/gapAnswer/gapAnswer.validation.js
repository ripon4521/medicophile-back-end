"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gapAnswerValidation = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const createGapAnswerSchema = zod_1.z.object({
    body: zod_1.z.object({
        examId: zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
            message: "Invalid examId format",
        }),
        questionId: zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
            message: "Invalid questionId format",
        }),
        studentId: zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
            message: "Invalid studentId format",
        }),
        answer: zod_1.z.string().min(1, { message: "Answer cannot be empty" }).max(500, {
            message: "Answer is too long",
        }),
    }),
});
const updateGapAnswerSchema = zod_1.z.object({
    body: zod_1.z.object({
        answer: zod_1.z
            .string()
            .min(1, { message: "Answer cannot be empty" })
            .max(500, {
            message: "Answer is too long",
        })
            .optional(),
    }),
});
exports.gapAnswerValidation = {
    createGapAnswerSchema,
    updateGapAnswerSchema,
};
