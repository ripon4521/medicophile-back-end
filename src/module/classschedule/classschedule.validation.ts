import { z } from "zod";
import { Types } from "mongoose";

const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});
const daySchema = z.object({
  day: z.string().min(1, { message: "Day is required" }),
  time: z.string().min(1, { message: "Time is required" }).optional(),
});

export const classScheduleSchema = z.object({
  body: z.object({
    day: z.array(daySchema).min(1, { message: "Day is required" }),
    courseId: ObjectIdSchema,
    facultyId: ObjectIdSchema,
  }),
});
