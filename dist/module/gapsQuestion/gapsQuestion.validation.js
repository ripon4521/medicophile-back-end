"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gapsQuestionValidation = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
const createGapsQuestionSchema = zod_1.z.object({
    body: zod_1.z.object({
        examId: ObjectIdSchema,
        createdBy: ObjectIdSchema,
        question: zod_1.z.string().min(1, { message: "Question is required" }),
        duration: zod_1.z.number().min(0, "Duration is mustt be need"),
        mark: zod_1.z.number().min(0, "Mark is must be need"),
        answer: zod_1.z
            .array(zod_1.z.string())
            .nonempty({ message: "At least one answer is required" }),
    }),
});
const updateGapsQuestionSchema = zod_1.z.object({
    body: zod_1.z.object({
        examId: ObjectIdSchema.optional(),
        createdBy: ObjectIdSchema.optional(),
        question: zod_1.z.string().min(1, { message: "Question is required" }).optional(),
        duration: zod_1.z.number().min(0, "Duration is mustt be need").optional(),
        mark: zod_1.z.number().min(0, "Mark is must be need").optional(),
        answer: zod_1.z
            .array(zod_1.z.string())
            .nonempty({ message: "At least one answer is required" })
            .optional(),
    }),
});
exports.gapsQuestionValidation = {
    createGapsQuestionSchema,
    updateGapsQuestionSchema,
};
