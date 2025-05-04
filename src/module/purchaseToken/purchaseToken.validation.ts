import { Types } from "mongoose";
import { z, object } from "zod";

const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

// Payment Info Validation
export const paymentInfoSchema = z.object({
  transactionId: z.string({ required_error: "Transaction ID is required" }),
  method: z.enum(["Bkash", "Nagad", "Bank", "Cash"], {
    required_error: "Payment method is required",
  }),
  accountNumber: z.string({ required_error: "account number is requried" }),
  paymentMedium: z.enum(["personal", "agent", "merchant"]).optional(),
  proofUrl: z.string().url("Invalid proof URL").optional(),
});

const createPurchaseTokenSchema = z.object({
  body: z.object({
    studentId: ObjectIdSchema,
    courseId: ObjectIdSchema,
    ref: ObjectIdSchema.optional(),
    coupon: z.string().optional(),
    price: z.number({ required_error: "Price is required" }),
    subtotal: z.number({ required_error: "Subtotal is required" }),
    discount: z.number({ required_error: "Discount is required" }),
    charge: z.number({ required_error: "Charge is required" }),
    totalAmount: z.number({ required_error: "Total amount is required" }),
    paymentInfo: paymentInfoSchema,
    name: z.string({ required_error: "Name is required" }),
    phone: z.string({ required_error: "Phone is required" }),
  }),
});

const updatePurchaseTokenSchema = z.object({
  body: z.object({
    studentId: ObjectIdSchema.optional(),
    courseId: ObjectIdSchema.optional(),
    status: z
      .enum(["Verified", "Unverified", "Rejected"], {
        required_error: "Status is required",
      })
      .optional(),
    purchaseToken: z
      .string({ required_error: "Purchase token is required" })
      .optional(),
    coupon: z.string().optional(),
    price: z.number({ required_error: "Price is required" }).optional(),
    subtotal: z.number({ required_error: "Subtotal is required" }).optional(),
    discount: z.number({ required_error: "Discount is required" }).optional(),
    charge: z.number({ required_error: "Charge is required" }).optional(),
    totalAmount: z
      .number({ required_error: "Total amount is required" })
      .optional(),
    issuedBy: ObjectIdSchema.optional(),
    paymentInfo: paymentInfoSchema.optional(),
    name: z.string({ required_error: "Name is required" }).optional(),
    phone: z.string({ required_error: "Phone is required" }).optional(),
  }),
});

export const purchaseTokenValidation = {
  createPurchaseTokenSchema,
  updatePurchaseTokenSchema,
};
