import { Types } from "mongoose";
import { z } from "zod";
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

const optionalNonEmptyString = z.union([z.string().min(1), z.literal("")]).optional();

const createEnrollmentSchema = z.object({
  body: z.object({
    courseId: ObjectIdSchema,
    paidAmont: z
      .number()
      .min(0, "Paid amount must be greater than or equal to 0"),
    discount: z
      .number()
      .min(0, "Paid amount must be greater than or equal to 0"),
    due: z
      .number()
      .min(0, "Paid amount must be greater than or equal to 0"),
    paymentMethod: z.enum(["cash", "bikash", "nagad", "roket"]),
    paymentNumber: optionalNonEmptyString,
    transctionId: optionalNonEmptyString,
    discountReason:optionalNonEmptyString,
     name: z.string().min(1, "Name cannot be empty."),
    phone: z
      .string()
      .regex(/^\+?(88)?01[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),
    
  }),
});
const updateEnrollmentSchema = z.object({
  body: z.object({
    paidAmont: z
      .number()
      .min(0, "Paid amount must be greater than or equal to 0").optional(),
    discount: z
      .number()
      .min(0, "Paid amount must be greater than or equal to 0").optional(),
    paymentMethod: z.enum(["cash", "bikash", "nagad", "roket"]).optional(),
    paymentNumber: optionalNonEmptyString,
    transctionId: optionalNonEmptyString,
    discountReason:optionalNonEmptyString,
    status: z.enum(["active", "blocked"]).optional(),
  }),
});

export const enrolemntValidation = {
  createEnrollmentSchema,
  updateEnrollmentSchema,
};
