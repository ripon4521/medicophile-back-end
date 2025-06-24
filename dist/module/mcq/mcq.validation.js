"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mcqValidation = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
// Optional string that allows empty string or minimum 1 character string
const optionalNonEmptyString = zod_1.z.union([zod_1.z.string().min(1), zod_1.z.literal("")]).optional();
// Optional array of non-empty strings, or empty string (to allow clearing the field)
const optionalStringArray = zod_1.z.union([zod_1.z.array(zod_1.z.string().min(1)), zod_1.z.literal("")]).optional();
const createMcqQuestionSchema = zod_1.z.object({
    body: zod_1.z.object({
        examId: ObjectIdSchema,
        question: zod_1.z.string().min(1, "Question is required"),
        questionImg: optionalNonEmptyString,
        options: zod_1.z.array(zod_1.z.string().min(1)).min(2, "There must be at least two options"),
        correctAnswer: zod_1.z.string().min(1, "Correct answer is required"),
        explaination: optionalNonEmptyString,
        tags: optionalStringArray,
        subject: optionalNonEmptyString,
        insertBy: ObjectIdSchema,
    }),
});
const updateMcqQuestionSchema = zod_1.z.object({
    body: zod_1.z.object({
        examId: ObjectIdSchema.optional(),
        question: optionalNonEmptyString,
        questionImg: optionalNonEmptyString,
        options: zod_1.z.array(zod_1.z.string().min(1)).min(2, "There must be at least two options").optional(),
        correctAnswer: optionalNonEmptyString,
        explaination: optionalNonEmptyString,
        tags: optionalStringArray,
        subject: optionalNonEmptyString,
        questionType: optionalNonEmptyString,
        insertBy: ObjectIdSchema.optional(),
    }),
});
exports.mcqValidation = {
    createMcqQuestionSchema,
    updateMcqQuestionSchema,
};
