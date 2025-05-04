import { z } from "zod";
import { Types } from "mongoose";
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});
export const AttendenceSchema = z.object({
  body: z.object({
    studentId: ObjectIdSchema,
  }),
});
