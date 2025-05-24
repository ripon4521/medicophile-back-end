import { z } from "zod";
import { Types } from "mongoose";

// ObjectId validation
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

// Optional non-empty string or empty string for optional string fields
const optionalNonEmptyString = z.union([z.string().min(1), z.literal("")]).optional();

const createModuleSchema = z.object({
  body: z.object({
    moduleTitle: z.string().min(1, "Module title is required"),
    courseId: ObjectIdSchema,
    createdBy: ObjectIdSchema,
  }),
});

const updateModuleSchema = z.object({
  body: z.object({
    moduleTitle: optionalNonEmptyString,
    courseId: ObjectIdSchema.optional(),
    createdBy: ObjectIdSchema.optional(),
  }),
});

export const moduleValidation = {
  createModuleSchema,
  updateModuleSchema,
};
