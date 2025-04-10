import { Types } from "mongoose";
import { z } from "zod";

const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

const createCqAttemptValidationSchema = z.object({
  body: z.object({
    studentId: ObjectIdSchema,
    examId: ObjectIdSchema,
    questionId: ObjectIdSchema,
    submitedPdf: z.string().url({ message: "Must be a valid PDF URL" }),
  }),
});

const updateCqAttemptValidationSchema = z.object({
  body: z.object({
    studentId: ObjectIdSchema.optional(),
    examId: ObjectIdSchema.optional(),
    questionId: ObjectIdSchema.optional(),
    submitedPdf: z
      .string()
      .url({ message: "Must be a valid PDF URL" })
      .optional(),
    submissionStatus: z.enum(["In Time", "Late"]).optional(),
    submittedTime: z.coerce.date().optional(),
  }),
});


export const cqAttempsValidation = {
    createCqAttemptValidationSchema,
    updateCqAttemptValidationSchema
}