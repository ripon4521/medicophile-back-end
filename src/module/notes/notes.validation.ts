import { z } from "zod";
import { Types } from "mongoose";

const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

const createNotesSchema = z.object({
  bod: z.object({
    noteTitle: z.string().min(1, "Note title is required"),
    description: z.string().min(1, "Description is required"),
    createdBy: ObjectIdSchema,
    courseId: ObjectIdSchema,
    noteFile: z.string().url("Invalid file URL"),
    TotalQuestion: z
      .number()
      .min(0, "Total questions must be a positive number"),
    classTime: z.string().datetime("Invalid date format"),
    launchingDate: z.string().datetime("Invalid date format"),
    status: z.enum(["published", "drafted"]),
  }),
});

export const noteValidation = {
  createNotesSchema,
};
