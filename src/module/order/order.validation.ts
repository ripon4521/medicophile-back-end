import { z } from "zod";
import { Types } from "mongoose";

const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

// Helpers
const optionalNonEmptyString = z.union([z.string().min(1), z.literal("")]).optional();
const optionalURL = z.union([z.string().url("Invalid URL"), z.literal("")]).optional();
const optionalPhoneString = z.union([z.string().min(10), z.literal("")]).optional();
const optionalStatus = z.union([
  z.enum(["Pending", "Processing", "Courier", "Delivered"]),
  z.literal(""),
]).optional();

// Payment Info Schema
export const paymentInfoSchema = z.object({
  transactionId: z.union([z.string().min(1, "Transaction ID is required"), z.literal("")]),
  method: z.enum(["Bkash", "Nagad", "Bank", "Cash"]),
  accountNumber: optionalNonEmptyString,
  medium: z.enum(["personal", "agent", "merchant"]).optional(),
  paymentDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid payment date",
  }),
  proofUrl: optionalURL,
});

const createOrderZodSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    address: optionalNonEmptyString,
    paymentInfo: paymentInfoSchema,
    subTotal: z.number().min(0),
    discount: z.number().min(0).optional(),
    coupoun: ObjectIdSchema.optional(),
    productId: ObjectIdSchema,
    userId: ObjectIdSchema,
    charge: z.number().min(0).optional(),
    shiping: z.number().min(0),
    quantity: z.number().min(0),
    totalAmount: z.number().min(0),
    paidAmount: z.number().min(0),
  }),
});

const updateOrderZodSchema = z.object({
  body: z.object({
    name: optionalNonEmptyString,
    phone: optionalPhoneString,
    address: optionalNonEmptyString,
    status: optionalStatus,
  }),
});

export const orderValidation = {
  createOrderZodSchema,
  updateOrderZodSchema,
};
