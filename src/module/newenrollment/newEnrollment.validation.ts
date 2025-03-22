import { Types } from "mongoose";
import { z } from "zod";
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});
const createEnrollmentSchema = z.object({
  body: z.object({
    studentId: ObjectIdSchema,
    courseId: ObjectIdSchema,
    paidAmont: z
      .number()
      .min(0, "Paid amount must be greater than or equal to 0"),
    paymentMethod: z.enum(["cash", "bikash", "nagad", "roket"]),
    status: z.enum(["active", "blocked"]),
    paymentNumber: z.string().optional(),
    transctionId: z.string().optional(),
  }),
});
const updateEnrollmentSchema = z.object({
  body: z.object({
    status: z.enum(["active", "blocked"]).optional(),
  }),
});

export const enrolemntValidation = {
  createEnrollmentSchema,
  updateEnrollmentSchema,
};
