import { z } from "zod";
import { Types } from "mongoose";

const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

const createExamSchema = z.object({
  body: z.object({
    courseId: ObjectIdSchema,
    createdBy: ObjectIdSchema,
    examTitle: z.string().min(1, "Lecture title is required"),
    description: z.string().optional(),
    TotalQuestion: z.number().min(0, "Total Question is required"),
    positiveMark: z.number().min(0, " Positive Mark is required"),
    negativeMark: z.number().min(0, " Negative Mark is required"),
    launchingDate: z.string(),
    duration: z.number().min(0, "Duration is requird"),
    examType: z.enum(["MCQ", "CQ", "Fill in the gaps"]),
    status: z.enum(["published", "drafted"]),
    validDate: z.string().datetime("Invalid date format"),
  }),
});

const updateExammSchema = z.object({
    body: z.object({
      examTitle: z.string().min(1, "Lecture title is required").optional(),
      description: z.string().optional(),
      TotalQuestion: z.number().min(0, "Total Question is required").optional(),
      positiveMark: z.number().min(0, " Positive Mark is required").optional(),
      negativeMark: z.number().min(0, " Negative Mark is required").optional(),
      launchingDate: z.string().optional(),
      duration: z.number().min(0, "Duration is requird").optional(),
      examType: z.enum(["MCQ", "CQ", "Fill in the gaps"]).optional(),
      status: z.enum(["published", "drafted"]).optional(),
      validDate: z.string().datetime("Invalid date format").optional(),
    }),
  });
  

export const examValidation = {
  createExamSchema,
  updateExammSchema,
};
