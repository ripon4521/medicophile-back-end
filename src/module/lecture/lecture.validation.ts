import { z } from "zod";
import { Types } from "mongoose";

const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});


const createLectureSchema = z.object({
  body: z.object({
  courseId: ObjectIdSchema,
  createdBy: ObjectIdSchema,
  moduleId: ObjectIdSchema,
  title: z.string().min(1, "Title is required"),
  server: z.string().min(1, "Server is required"),
  videoLink: z.string().url("Invalid video URL"),
  duration: z.number().min(1, "Duration must be greater than 0"),
  isFree: z.boolean(),
  status: z.enum(["Published", "Drafted"]),
  tags: z.array(z.string()),
  deletedAt: z.union([z.date().nullable(), z.null()]).optional(),
  isDeleted: z.boolean().optional(),
  }),
});

const updateLectureSchema = z.object({
  body: z.object({
    courseId: ObjectIdSchema.optional(),
    createdBy: ObjectIdSchema.optional(),
    moduleId: ObjectIdSchema.optional(),
    title: z.string().min(1, "Title is required").optional(),
    server: z.string().min(1, "Server is required").optional(),
    videoLink: z.string().url("Invalid video URL").optional(),
    duration: z.number().min(1, "Duration must be greater than 0").optional(),
    isFree: z.boolean().optional(),
    status: z.enum(["Published", "Drafted"]).optional(),
    tags: z.array(z.string()).optional(),
    deletedAt: z.union([z.date().nullable(), z.null()]).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const lectureValidation = {
  createLectureSchema,
  updateLectureSchema,
};
