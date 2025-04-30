"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mcqAttemptSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
const answerItemSchema = zod_1.z.object({
    questionId: ObjectIdSchema,
    selectedAnswer: zod_1.z.string().min(1, "Answer cannot be empty"),
});
exports.mcqAttemptSchema = zod_1.z.object({
    body: zod_1.z.object({
        answer: zod_1.z.array(answerItemSchema).min(1, "At least one answer is required"),
        studentId: ObjectIdSchema,
    }),
});
