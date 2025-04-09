import { Types } from "mongoose";
import { z } from "zod";


const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

const createCqMarkingSchema = z.object({
    body:z.object({
    studentId: ObjectIdSchema,
    examId: ObjectIdSchema,
    questionId: ObjectIdSchema,
    score: z.number().min(0, "Score must be a positive number"),
    comment: z.string().optional(),     
})
  });

const updateCqMarkingSchema = z.object({
    body:z.object({
    studentId: ObjectIdSchema.optional(),
    examId: ObjectIdSchema.optional(),
    questionId: ObjectIdSchema.optional(),
    score: z.number().min(0, "Score must be a positive number").optional(),
    comment: z.string().optional(),
})
  });


  export const cqMarkingValidation = {
    createCqMarkingSchema,
    updateCqMarkingSchema
  }