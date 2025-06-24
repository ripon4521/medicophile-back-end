"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classQuizeQuestionValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
// Optional string that can be empty or non-empty
const optionalNonEmptyString = zod_1.z.union([zod_1.z.string().min(1), zod_1.z.literal("")]).optional();
const createCqQuestionSchema = zod_1.z.object({
    body: zod_1.z.object({
        examId: ObjectIdSchema,
        createdBy: ObjectIdSchema,
        question: zod_1.z.string().min(1, "Question cannot be empty"),
        status: zod_1.z.enum(["Published", "Drafted"]),
    }),
});
const updateCqQuestionSchema = zod_1.z.object({
    body: zod_1.z.object({
        examId: ObjectIdSchema.optional(),
        createdBy: ObjectIdSchema.optional(),
        question: optionalNonEmptyString,
        status: zod_1.z.enum(["Published", "Drafted"]).optional(),
    }),
});
exports.classQuizeQuestionValidation = {
    createCqQuestionSchema,
    updateCqQuestionSchema,
};
