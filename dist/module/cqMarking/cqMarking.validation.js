"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cqMarkingValidation = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
// Reusable ObjectId validation
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
// Reusable score validation (non-negative number)
const scoreSchema = zod_1.z.number().min(0, "Score must be a positive number");
const createCqMarkingSchema = zod_1.z.object({
    body: zod_1.z.object({
        studentId: ObjectIdSchema,
        examId: ObjectIdSchema,
        questionId: ObjectIdSchema,
        score: scoreSchema,
        comment: zod_1.z.string().optional(),
    }),
});
const updateCqMarkingSchema = zod_1.z.object({
    body: zod_1.z.object({
        studentId: ObjectIdSchema.optional(),
        examId: ObjectIdSchema.optional(),
        questionId: ObjectIdSchema.optional(),
        score: scoreSchema.optional(),
        comment: zod_1.z.string().optional(),
    }),
});
exports.cqMarkingValidation = {
    createCqMarkingSchema,
    updateCqMarkingSchema,
};
