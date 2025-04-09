import { Types } from "mongoose";
import { z } from "zod";

const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

const createCqAttemptValidationSchema = z.object({
  body: z.object({
    studentId: ObjectIdSchema,
    examId: ObjectIdSchema,
    checkedBy: ObjectIdSchema,
    submitedPdf: z.string().url({ message: "Must be a valid PDF URL" }),
    score: z.number().min(0, "Score must be a non-negative number"),
    submissionStatus: z.enum(["In Time", "Late"]),
    startTime: z.coerce.date(),
    submittedTime: z.coerce.date(),
  }),
});

const updateCqAttemptValidationSchema = z.object({
  body: z.object({
    studentId: ObjectIdSchema.optional(),
    examId: ObjectIdSchema.optional(),
    checkedBy: ObjectIdSchema.optional(),
    submitedPdf: z
      .string()
      .url({ message: "Must be a valid PDF URL" })
      .optional(),
    score: z.number().min(0, "Score must be a non-negative number").optional(),
    submissionStatus: z.enum(["In Time", "Late"]).optional(),
    startTime: z.coerce.date().optional(),
    submittedTime: z.coerce.date().optional(),
  }),
});


export const cqAttempsValidation = {
    createCqAttemptValidationSchema,
    updateCqAttemptValidationSchema
}