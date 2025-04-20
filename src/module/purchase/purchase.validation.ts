
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
 
      status: z.enum(["Archive", "Course Out", "Active"]).optional(),
      paymentStatus: z.enum(["Paid", "Pending", "Partial", "Refunded", "Rejected"]).optional(),
    
       
})
});


export const purchaseValidation = {
    createPurchaseSchema,
    updatePurchaseSchema
}