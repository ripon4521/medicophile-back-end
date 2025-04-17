import { Types } from "mongoose";
import { z } from "zod";

const GapAttempZodSchema = z.object({
  studentId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid studentId format",
  }),
  examId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid examId format",
  }),
  score: z.number().min(0, { message: "Score cannot be negative" }).max(100, {
    message: "Score cannot be greater than 100",
  }),
  totalMarks: z
    .number()
    .min(1, { message: "Total marks must be greater than 0" }),
  attemptedAt: z.date(),
});
