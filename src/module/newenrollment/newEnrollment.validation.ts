import { Types } from "mongoose";
import { z } from "zod";

const createEnrollmentSchema = z.object({
  studentId: z.instanceof(Types.ObjectId),
  courseId: z.instanceof(Types.ObjectId),
  paidAmont: z
    .number()
    .min(0, "Paid amount must be greater than or equal to 0"),
  paymentMethod: z.enum(["cash", "bikash", "nagad", "roket"]),
  status: z.enum(["active", "blocked"]),
});
const updateEnrollmentSchema = z.object({
  status: z.enum(["active", "blocked"]).optional(),
});

export const enrolemntValidation = {
    createEnrollmentSchema,
    updateEnrollmentSchema
}

