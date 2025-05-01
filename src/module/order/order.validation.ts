import { z } from "zod";
import { Types } from "mongoose";


const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
  });

// Payment Info Schema (Assuming basic structure – customize if needed)
export const paymentInfoSchema = z.object({
  transactionId: z.string().min(1, "Transaction ID is required"),
  method: z.enum(["Bkash", "Nagad", "Bank", "Cash"]),
  accountNumber: z.string().optional(),
  medium: z.enum(["personal", "agent", "merchant"]).optional(),
  paymentDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid payment date",
  }),
  proofUrl: z.string().url("Invalid proof URL").optional(),
});

 const createOrderZodSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string(),
    address: z.string().min(1, "Address is required"),
    paymentInfo: paymentInfoSchema,
    subTotal: z.number().min(0),
    discount: z.number().min(0).optional(),
    coupoun: ObjectIdSchema.optional(),
    productId: ObjectIdSchema,
    charge: z.number().min(0).optional(),
    shiping: z.number().min(0),
    quantity: z.number().min(0),
    totalAmount: z.number().min(0),
    paidAmount: z.number().min(0),
  }),
});


const updateOrderZodSchema = z.object({
    body: z.object({
      name: z.string().min(1, "Name is required").optional(),
      phone: z.number().min(1000000000, "Invalid phone number").optional(),
      address: z.string().min(1, "Address is required").optional(),
      paymentInfo: paymentInfoSchema.optional(),
      subTotal: z.number().min(0).optional(),
      discount: z.number().min(0).optional(),
      coupoun: ObjectIdSchema.optional(),
      charge: z.number().min(0).optional(),
      shiping: z.number().min(0).optional(),
      totalAmount: z.number().min(0).optional(),
      paidAmount: z.number().min(0).optional(),
    }),
  });


  export const orderValidation = {
    createOrderZodSchema,
    updateOrderZodSchema
  }