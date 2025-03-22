import { z } from "zod";
import { Types } from "mongoose";

const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
  });

const DurationSchema = z.object({
  hour: z.number().min(0, "Hour must be a positive number"),
  minute: z.number().min(0, "Minute must be a positive number"),
  second: z.number().min(0, "Second must be a positive number"),
});

export const createLectureSchema = z.object({
  courseId: ObjectIdSchema,
  createdBy:ObjectIdSchema,
  lectureTitle: z.string().min(1, "Lecture title is required"),
  description: z.string().optional(),
  serveer: z.string().min(1, "Server is required"),
  videoLink: z.string().url("Invalid video link"),
  duration: DurationSchema,
  isFree: z.enum(["yes", "no"]),
  status: z.enum(["published", "drafted"]),
  sheduleDate: z.string().datetime("Invalid date format"),
});
