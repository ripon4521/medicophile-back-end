

import { Types } from "mongoose";
import { z } from "zod";
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});


const answerItemSchema = z.object({
  questionId: ObjectIdSchema,
  selectedAnswer: z.string().min(1, "Answer cannot be empty"),
});


export const mcqAttemptSchema = z.object({
    body:z.object({

  answer: z.array(answerItemSchema).min(1, "At least one answer is required"),
  studentId: ObjectIdSchema,
          
})
});
