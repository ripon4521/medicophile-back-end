import { z } from "zod";
import { Types } from "mongoose";

const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

const createNotesSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required").optional(),
    createdBy: ObjectIdSchema,
    moduleId: ObjectIdSchema,
    courseId: ObjectIdSchema,
    noteFile: z.string().optional(),
    status: z.enum(["Published", "Drafted"]),
    scheduleDate: z
      .preprocess((val) => {
        if (typeof val === "string" || val instanceof Date) {
          return new Date(val);
        }
        return val;
      }, z.date())
      .optional(),
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
    status: z.enum(["Published", "Drafted"]).optional(),
    scheduleDate: z
      .preprocess((val) => {
        if (typeof val === "string" || val instanceof Date) {
          return new Date(val);
        }
        return val;
      }, z.date())
      .optional(),
  }),
});

export const noteValidation = {
  createNotesSchema,
  updateNotesSchema,
};
