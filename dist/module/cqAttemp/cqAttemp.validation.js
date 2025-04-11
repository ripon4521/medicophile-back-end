"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cqAttempsValidation = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
const createCqAttemptValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        studentId: ObjectIdSchema,
        examId: ObjectIdSchema,
        questionId: ObjectIdSchema,
        submitedPdf: zod_1.z.string().url({ message: "Must be a valid PDF URL" }),
    }),
});
const updateCqAttemptValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        studentId: ObjectIdSchema.optional(),
        examId: ObjectIdSchema.optional(),
        questionId: ObjectIdSchema.optional(),
        submitedPdf: zod_1.z
            .string()
            .url({ message: "Must be a valid PDF URL" })
            .optional(),
        submissionStatus: zod_1.z.enum(["In Time", "Late"]).optional(),
        submittedTime: zod_1.z.coerce.date().optional(),
    }),
});
exports.cqAttempsValidation = {
    createCqAttemptValidationSchema,
    updateCqAttemptValidationSchema,
};
