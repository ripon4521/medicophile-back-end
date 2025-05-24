import { Types } from "mongoose";
import { z } from "zod";

// Reusable ObjectId schema
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

// Gap Attempt Schema
const GapAttempZodSchema = z.object({
  studentId: ObjectIdSchema,
  examId: ObjectIdSchema,
  score: z
    .number()
    .min(0, { message: "Score cannot be negative" })
    .max(100, { message: "Score cannot be greater than 100" }),
  totalMarks: z.number().min(1, { message: "Total marks must be greater than 0" }),
  attemptedAt: z.coerce.date({
    errorMap: () => ({ message: "Attempted time must be a valid date" }),
  }),
});

export { GapAttempZodSchema };
