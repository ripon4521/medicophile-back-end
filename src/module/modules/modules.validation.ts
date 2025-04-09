import { z } from "zod";
import { Types } from "mongoose";

// ObjectId validation
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

const createModuleSchema = z.object({
  body: z.object({
    moduleTitle: z.string().min(1),
    courseId: ObjectIdSchema,
    createdBy: ObjectIdSchema,
  }),
});

const updateModuleSchema = z.object({
  body: z.object({
    moduleTitle: z.string().min(1).optional(),
    courseId: ObjectIdSchema.optional(),
    createdBy: ObjectIdSchema.optional(),
  }),
});

export const moduleValidation = {
  createModuleSchema,
  updateModuleSchema,
};
