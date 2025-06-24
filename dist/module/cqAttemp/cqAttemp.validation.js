"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cqAttempsValidation = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
// Reusable ObjectId validation
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
// PDF URL validation (must end with .pdf optionally)
const pdfUrlSchema = zod_1.z
    .string()
    .url({ message: "Must be a valid URL" })
    .refine((url) => url.endsWith(".pdf"), {
    message: "URL must link to a PDF file",
});
const createCqAttemptValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        studentId: ObjectIdSchema,
        examId: ObjectIdSchema,
        questionId: ObjectIdSchema,
        submitedPdf: pdfUrlSchema,
    }),
});
const updateCqAttemptValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        studentId: ObjectIdSchema.optional(),
        examId: ObjectIdSchema.optional(),
        questionId: ObjectIdSchema.optional(),
        submitedPdf: pdfUrlSchema.optional(),
    }),
});
exports.cqAttempsValidation = {
    createCqAttemptValidationSchema,
    updateCqAttemptValidationSchema,
};
