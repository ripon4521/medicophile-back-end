import { z } from "zod";
import { Types } from "mongoose";
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

const createExamSchema = z.object({
  body: z.object({
    examTitle: z.string().min(1),
    createdBy: ObjectIdSchema,
    courseId: ObjectIdSchema,
    moduleId: ObjectIdSchema,
    examType: z.enum(["MCQ", "CQ", "Fill in the gaps"]),
    totalQuestion: z.number().int().min(1),
    positiveMark: z.number().min(0),
    negativeMark: z.number().min(0),
    mcqDuration: z.number().min(0),
    cqMark: z.number().min(0),
    resultStatus: z.enum(["pending", "completed", "failed"]),
    validTime: z.string(),
    status: z.enum(["published", "drafted"]),
   
  }),
});

const updateExamSchema = z.object({
  body: z.object({
    examTitle: z.string().min(1).optional(),
    createdBy: ObjectIdSchema.optional(),
    courseId: ObjectIdSchema.optional(),
    moduleId: ObjectIdSchema.optional(),
    examType: z.enum(["MCQ", "CQ", "Fill in the gaps"]).optional(),
    totalQuestion: z.number().int().min(1).optional(),
    positiveMark: z.number().min(0).optional(),
    negativeMark: z.number().min(0).optional(),
    mcqDuration: z.number().min(0).optional(),
    cqMark: z.number().min(0).optional(),
    resultStatus: z.enum(["pending", "completed", "failed"]).optional(),
    validTime: z.string().optional(),
    status: z.enum(["published", "drafted"]).optional(),
  
  }),
});

export const examValidation = {
  createExamSchema,
  updateExamSchema,
};
