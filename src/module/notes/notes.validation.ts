import { z } from "zod";
import { Types } from "mongoose";

const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

const createNotesSchema = z.object({
  body: z.object({
  
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    createdBy: ObjectIdSchema,
    moduleId: ObjectIdSchema,
    courseId: ObjectIdSchema,
    noteFile: z.string().optional(),
    status: z.enum(["Published", "Drafted"]),
    deletedAt: z.union([z.date().nullable(), z.null()]).optional(),
    isDeleted: z.boolean().optional()
  }),
});

const updateNotesSchema = z.object({
  body: z.object({
    createdBy: ObjectIdSchema.optional(),
    moduleId: ObjectIdSchema.optional(),
    courseId: ObjectIdSchema.optional(),
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().min(1, "Description is required").optional(),
    noteFile: z.string().optional(),
    status: z.enum(["published", "drafted"]).optional(),
    deletedAt: z.union([z.date().nullable(), z.null()]).optional(),
    isDeleted: z.boolean().optional()
  }),
});

export const noteValidation = {
  createNotesSchema,
  updateNotesSchema,
};
