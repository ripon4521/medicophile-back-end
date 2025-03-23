import { z } from "zod";
import { Types } from "mongoose";

// ObjectId validation
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

const createModuleSchema = z.object({
  body: z.object({
    serialNumber: z.number().min(1, "Serial number must be at least 1"),
    moduleTitle: z.string().min(1, "Module title is required"),
    description: z.string().optional(),
    courseId: ObjectIdSchema,
    createdBy: ObjectIdSchema,
    status: z.enum(["published", "drafted"]),
    launchingDate: z.string().datetime("Invalid date format"),
  }),
});

const updateModuleSchema = z.object({
  body: z.object({
    serialNumber: z.number().min(1, "Serial number must be at least 1").optional(),
    moduleTitle: z.string().min(1, "Module title is required").optional(),
    description: z.string().optional(),
    status: z.enum(["published", "drafted"]).optional(),
    launchingDate: z.string().datetime("Invalid date format").optional(),
  }),
});

export const moduleValidation = {
    createModuleSchema,
    updateModuleSchema
}