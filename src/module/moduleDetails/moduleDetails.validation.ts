import { z } from "zod";
import { Types } from "mongoose";

const ObjectId = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

const createIModuleDetailsSchema = z.object({
  body: z.object({
    courseId: ObjectId,
    moduleId: ObjectId,
    content_type: z.enum(["lecture", "notes", "exam"]),
    contentId: ObjectId,
    status: z.enum(["published", "drafted"]),
    deletedAt: z.date().nullable(),
    isDeleted: z.boolean(),
  }),
});

const updateIModuleDetailsSchema = z.object({
  body: z.object({
    courseId: ObjectId.optional(),
    moduleId: ObjectId.optional(),
    content_type: z.enum(["lecture", "notes", "exam"]).optional(),
    contentId: ObjectId.optional(),
    status: z.enum(["published", "drafted"]).optional(),
    deletedAt: z.date().nullable().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const moduleDetailsValidation = {
  createIModuleDetailsSchema,
  updateIModuleDetailsSchema,
};
