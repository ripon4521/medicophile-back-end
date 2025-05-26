import { Types } from "mongoose";
import { z } from "zod";


const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});


export const orderSchema = z.object({
  body:z.object({


  source: z.literal("order"),
  orderId: ObjectIdSchema,
  customerId: ObjectIdSchema,
  amount: z.number().nonnegative(),
})  });


export const salesSchema = z.object({
  body:z.object({
 
  source: z.literal("sales"),
  purchaseId: ObjectIdSchema,
  customerId: ObjectIdSchema,
  amount: z.number().nonnegative(),
})   
  });

const optionalNonEmptyString = z.union([z.string().min(3), z.literal("")]).optional();

export const createexpenseSchema = z.object({
  body:z.object({


  title: z.string().min(1),
  description: optionalNonEmptyString,
  amount: z.number().nonnegative(),
  category: z.enum([
    "rent",
    "electricity",
    "internet",
    "salary",
    "transport",
    "others",
  ]),
  paymentMethod: z.enum(["cash", "bkash", "nagad", "bank", "card"]),
  addedBy: ObjectIdSchema,
})  });


export const updateexpenseSchema = z.object({
  body:z.object({
 
  title: optionalNonEmptyString,
  description: optionalNonEmptyString,
  amount: z.number().nonnegative().optional(),
  category: z.enum([
    "rent",
    "electricity",
    "internet",
    "salary",
    "transport",
    "others",
  ]).optional(),
  paymentMethod: z.enum(["cash", "bkash", "nagad", "bank", "card"]).optional(),
})   
  });



