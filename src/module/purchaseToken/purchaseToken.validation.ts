import { Types } from "mongoose";
import { z } from "zod";

// Reusable ObjectId Schema
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

// Helper schemas for flexible updates
const optionalObjectId = z.union([ObjectIdSchema, z.literal("")]).optional();
const optionalString = (msg: string) => z.union([z.string().min(1, msg), z.literal("")]).optional();
const optionalNumber = (msg: string) => z.union([z.number(), z.literal("")]).optional();
const requiredString = (msg: string) => z.string({ required_error: msg });
const requiredNumber = (msg: string) => z.number({ required_error: msg });

// Payment Info Schema
export const paymentInfoSchema = z.object({
  transactionId: optionalString("Transaction ID is required"),
  method: z.enum(["Bkash", "Nagad", "Bank", "Cash"]).optional(),
  accountNumber: optionalString("Account number is required"),
  paymentMedium: z.enum(["personal", "agent", "merchant"]).optional(),
  proofUrl: z.string().url("Invalid proof URL").optional(),
});

// Create PurchaseToken Schema
const createPurchaseTokenSchema = z.object({
  body: z.object({
    studentId: optionalObjectId,
    courseId: ObjectIdSchema,
    ref: optionalObjectId,
    coupon: z.string().optional(),
    price: optionalNumber("Price is required"),
    subtotal: optionalNumber("Subtotal is required"),
    discount: optionalNumber("Discount is required"),
    charge: optionalNumber("Charge is required"),
    totalAmount: optionalNumber("Total amount is required"),
    paymentInfo: paymentInfoSchema.optional(),
    name: requiredString("Name is required"),
    phone: requiredString("Phone is required"),
  }),
});

// Update PurchaseToken Schema
const updatePurchaseTokenSchema = z.object({
  body: z.object({
    studentId: optionalObjectId,
    courseId: optionalObjectId,
    status: z.enum(["Verified", "Unverified", "Rejected"]).optional(),
    purchaseToken: optionalString("Purchase token is required"),
    coupon: z.string().optional(),
    price: optionalNumber("Price is required"),
    subtotal: optionalNumber("Subtotal is required"),
    discount: optionalNumber("Discount is required"),
    charge: optionalNumber("Charge is required"),
    totalAmount: optionalNumber("Total amount is required"),
    issuedBy: optionalObjectId,
    paymentInfo: paymentInfoSchema.optional(),
    name: optionalString("Name is required"),
    phone: optionalString("Phone is required"),
  }),
});

export const purchaseTokenValidation = {
  createPurchaseTokenSchema,
  updatePurchaseTokenSchema,
};
