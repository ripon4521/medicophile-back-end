import { z } from "zod";
import { Types } from "mongoose";

const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

const createNotesSchema = z.object({
  body: z.object({
    noteTitle: z.string().min(1, "Note title is required"),
    description: z.string().min(1, "Description is required").optional(),
    createdBy: ObjectIdSchema,
    courseId: ObjectIdSchema,
    noteFile: z.string().url("Invalid file URL"),
    classTime: z.string().datetime("Invalid date format"),
    launchingDate: z.string().datetime("Invalid date format"),
    status: z.enum(["published", "drafted"]),
  }),
});

const updateNotesSchema = z.object({
  body: z.object({
    noteTitle: z.string().min(1, "Note title is required").optional(),
    description: z.string().min(1, "Description is required").optional(),
    noteFile: z.string().url("Invalid file URL").optional(),
    classTime: z.string().datetime("Invalid date format").optional(),
    launchingDate: z.string().datetime("Invalid date format").optional(),
    status: z.enum(["published", "drafted"]).optional(),
  }),
});

export const noteValidation = {
  createNotesSchema,
  updateNotesSchema,
};
