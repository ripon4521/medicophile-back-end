"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mcqValidation = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
const createMcqQuestionSchema = zod_1.z.object({
    body: zod_1.z.object({
        examId: ObjectIdSchema,
        question: zod_1.z.string().min(1, "Question is required"),
        questionImg: zod_1.z.string().min(1, "Question image is required").optional(),
        options: zod_1.z.array(zod_1.z.string()).min(2, "There must be at least two options"),
        correctAnswer: zod_1.z.string().min(1, "Correct answer is required"),
        explaination: zod_1.z.string().min(1, "Explanation is required").optional(),
        tags: zod_1.z.array(zod_1.z.string()).min(1, "At least one tag is required").optional(),
        subject: zod_1.z.string().min(1, "Subject is required").optional(),
        insertBy: ObjectIdSchema,
    })
});
const updateMcqQuestionSchema = zod_1.z.object({
    body: zod_1.z.object({
        examId: ObjectIdSchema.optional(),
        question: zod_1.z.string().min(1, "Question is required").optional(),
        questionImg: zod_1.z.string().min(1, "Question image is required").optional(),
        options: zod_1.z.array(zod_1.z.string()).min(2, "There must be at least two options").optional(),
        correctAnswer: zod_1.z.string().min(1, "Correct answer is required").optional(),
        explaination: zod_1.z.string().min(1, "Explanation is required").optional(),
        tags: zod_1.z.array(zod_1.z.string()).min(1, "At least one tag is required").optional(),
        subject: zod_1.z.string().min(1, "Subject is required").optional(),
        questionType: zod_1.z.string().min(1, "Question type is required").optional(),
        insertBy: ObjectIdSchema.optional(),
    })
});
exports.mcqValidation = {
    createMcqQuestionSchema,
    updateMcqQuestionSchema
};
