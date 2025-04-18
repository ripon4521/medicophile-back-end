
import { Types } from "mongoose";
import { z } from "zod";


const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

 const createPurchaseSchema = z.object({
    body:z.object({
 
  studentId: ObjectIdSchema,
  status: z.enum(["Archive", "Course Out"], {
    required_error: "Status is required",
  }),
  paymentStatus: z.enum(["Paid", "Pending", "Partial", "Refunded"], {
    required_error: "Payment status is required",
  }),
  purchaseToken: z.string({ required_error: "Purchase token is required" }),
  subtotal: z.number({ required_error: "Subtotal is required" }),
  discount: z.number({ required_error: "Discount is required" }),
  charge: z.number({ required_error: "Charge is required" }),
  totalAmount: z.number({ required_error: "Total amount is required" }),
  discountReason: z.string({ required_error: "Discount reason is required" }),
  issuedBy: ObjectIdSchema
       
})
});

const updatePurchaseSchema = z.object({
    body:z.object({
 
  studentId: ObjectIdSchema.optional(),
  status: z.enum(["Archive", "Course Out"], {
    required_error: "Status is required",
  }).optional(),
  paymentStatus: z.enum(["Paid", "Pending", "Partial", "Refunded"], {
    required_error: "Payment status is required",
  }).optional(),
  purchaseToken: z.string({ required_error: "Purchase token is required" }).optional(),
  subtotal: z.number({ required_error: "Subtotal is required" }).optional(),
  discount: z.number({ required_error: "Discount is required" }).optional(),
  charge: z.number({ required_error: "Charge is required" }).optional(),
  totalAmount: z.number({ required_error: "Total amount is required" }).optional(),
  discountReason: z.string({ required_error: "Discount reason is required" }).optional(),
  issuedBy: ObjectIdSchema.optional()
       
})
});


export const purchaseValidation = {
    createPurchaseSchema,
    updatePurchaseSchema
}