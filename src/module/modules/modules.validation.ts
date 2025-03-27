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
    deletedAt: z.union([z.date().optional(), z.null()]),
    isDeleted: z.boolean(),
  }),
});

const updateModuleSchema = z.object({
  body: z.object({
    moduleTitle: z.string().min(1).optional(),
    courseId: ObjectIdSchema.optional(),
    createdBy: ObjectIdSchema.optional(),
    deletedAt: z.union([z.date().optional(), z.null()]).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const moduleValidation = {
  createModuleSchema,
  updateModuleSchema,
};
