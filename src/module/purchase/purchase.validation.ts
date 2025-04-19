
import { Types } from "mongoose";
import { z } from "zod";


const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

 const createPurchaseSchema = z.object({
    body:z.object({
 
      studentId: ObjectIdSchema,
      paymentStatus: z.enum(["Paid", "Pending", "Partial", "Refunded", "Rejected"]),
      purchaseToken: ObjectIdSchema,
      issuedBy: ObjectIdSchema,
       
})
});

const updatePurchaseSchema = z.object({
    body:z.object({
 
      studentId:ObjectIdSchema.optional(),
      status: z.enum(["Archive", "Course Out", "Active"]).optional(),
      paymentStatus: z.enum(["Paid", "Pending", "Partial", "Refunded", "Rejected"]).optional(),
      purchaseToken: ObjectIdSchema.optional(),
      subtotal: z.number().nonnegative().optional(),
      discount: z.number().nonnegative().optional(),
      charge: z.number().nonnegative().optional(),
      totalAmount: z.number().nonnegative().optional(),
      discountReason: z.string().max(500).optional().or(z.literal("")).optional(),
      issuedBy: ObjectIdSchema.optional(),
    
       
})
});


export const purchaseValidation = {
    createPurchaseSchema,
    updatePurchaseSchema
}