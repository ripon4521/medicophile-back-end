import { Types } from "mongoose";
import { z } from "zod";
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});


 const createProductSchema = z.object({
    body:z.object({
  
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    trailer: z.string().url("Invalid URL").optional(),
    categoryId: ObjectIdSchema,
    status: z.enum(["Active", "Drafted"]),
    price: z.number().min(0, "Price must be a positive number"),
    offerPrice: z.number().min(0, "Offer price must be a positive number").optional(),
    stock: z.enum(["In Stock", "Out Off Stock"]),
    coverPhoto: z.string().url("Invalid cover photo URL"),
    createdBy: ObjectIdSchema,
    tags: z.array(z.string())
          
})
  });

  const updateProductSchema = z.object({
    body:z.object({

   
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().optional(),
    trailer: z.string().url("Invalid URL").optional(),
    categoryId: ObjectIdSchema.optional(),
    status: z.enum(["Active ", "Drafted"]).optional(),
    price: z.number().min(0, "Price must be a positive number").optional(),
    offerPrice: z.number().min(0, "Offer price must be a positive number").optional(),
    stock: z.enum(["In Stock", "Out Off Stock"]).optional(),
    coverPhoto: z.string().url("Invalid cover photo URL").optional(),
    createdBy: ObjectIdSchema.optional(),
    tags: z.array(z.string()).optional()
})
  });

  export const productValidation = {
    createProductSchema,
    updateProductSchema
  }