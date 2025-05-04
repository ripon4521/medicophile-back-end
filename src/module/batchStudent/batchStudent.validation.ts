import { Types } from "mongoose";
import { z } from "zod";

const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

const createBatchStudentSchema = z.object({
  body: z.object({
    batchId: ObjectIdSchema,
    courseId: ObjectIdSchema,
    studentId: ObjectIdSchema,
  }),
});

const updateBatchStudentSchema = z.object({
  body: z.object({
    batchId: ObjectIdSchema.optional(),
    courseId: ObjectIdSchema.optional(),
    studentId: ObjectIdSchema.optional(),
  }),
});

export const batchStudentValidation = {
  createBatchStudentSchema,
  updateBatchStudentSchema,
};
