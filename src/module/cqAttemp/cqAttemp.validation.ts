import { Types } from "mongoose";
import { z } from "zod";

// Reusable ObjectId validation
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

// PDF URL validation (must end with .pdf optionally)
const pdfUrlSchema = z
  .string()
  .url({ message: "Must be a valid URL" })
  .refine((url) => url.endsWith(".pdf"), {
    message: "URL must link to a PDF file",
  });

const createCqAttemptValidationSchema = z.object({
  body: z.object({
    studentId: ObjectIdSchema,
    examId: ObjectIdSchema,
    questionId: ObjectIdSchema,
    submitedPdf: pdfUrlSchema,
  }),
});

const updateCqAttemptValidationSchema = z.object({
  body: z.object({
    studentId: ObjectIdSchema.optional(),
    examId: ObjectIdSchema.optional(),
    questionId: ObjectIdSchema.optional(),
    submitedPdf: pdfUrlSchema.optional(),
  }),
});

export const cqAttempsValidation = {
  createCqAttemptValidationSchema,
  updateCqAttemptValidationSchema,
};
