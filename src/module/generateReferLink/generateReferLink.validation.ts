import { z } from "zod";
import { Types } from "mongoose";

// ObjectId validation
const ObjectId = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId",
});

// Referral Schema
export const IReferralSchema = z.object({
  body: z.object({
    userId: ObjectId,
    courseId: ObjectId,
    courseSlug: z.string().min(1, { message: "Course slug is required" }),
  }),
});
