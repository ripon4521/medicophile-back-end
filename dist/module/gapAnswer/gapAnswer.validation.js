"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gapAnswerValidation = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
// Reusable ObjectId schema
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
// Reusable answer schema
const AnswerSchema = zod_1.z
    .string()
    .min(1, { message: "Answer cannot be empty" })
    .max(500, { message: "Answer is too long" });
// Create Schema
const createGapAnswerSchema = zod_1.z.object({
    body: zod_1.z.object({
        examId: ObjectIdSchema,
        questionId: ObjectIdSchema,
        studentId: ObjectIdSchema,
        answer: AnswerSchema,
    }),
});
// Update Schema
const updateGapAnswerSchema = zod_1.z.object({
    body: zod_1.z.object({
        answer: AnswerSchema.optional(),
    }),
});
exports.gapAnswerValidation = {
    createGapAnswerSchema,
    updateGapAnswerSchema,
};
