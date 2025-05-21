import { Types } from "mongoose";
import { z } from "zod";

const ObjectIdSchema = z
  .string()
  .refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
  });

// Helpers for optional fields that allow empty string
const optionalNonEmptyString = z.union([z.string().min(1), z.literal("")]).optional();
const optionalURL = z.union([z.string().url("Invalid URL"), z.literal("")]).optional();

const createProductSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: optionalNonEmptyString,
    pdf: optionalNonEmptyString,
    uploadLink: optionalNonEmptyString,
    trailer: optionalURL,
    categoryId: ObjectIdSchema,
    status: z.enum(["Active", "Drafted"]),
    bookType: z.enum(["Hard Copy", "PDF"]),
    price: z.number().min(0, "Price must be a positive number"),
    offerPrice: z.number().min(0, "Offer price must be a positive number").optional(),
    stock: z.enum(["In Stock", "Out Off Stock"]),
    coverPhoto: z.string().url("Invalid cover photo URL"),
    createdBy: ObjectIdSchema,
    tags: z.array(z.string()),
  }),
});

const updateProductSchema = z.object({
  body: z.object({
    title: optionalNonEmptyString,
    description: optionalNonEmptyString,
    pdf:optionalNonEmptyString,
    uploadLink:optionalNonEmptyString,
    trailer: optionalURL,
    categoryId: ObjectIdSchema.optional(),
    status: z.enum(["Active", "Drafted"]).optional(),
    bookType: z.enum(["Hard Copy", "PDF"]).optional(),
    price: z.number().min(0, "Price must be a positive number").optional(),
    offerPrice: z.number().min(0, "Offer price must be a positive number").optional(),
    stock: z.enum(["In Stock", "Out Off Stock"]).optional(),
    coverPhoto: optionalURL,
    createdBy: ObjectIdSchema.optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const productValidation = {
  createProductSchema,
  updateProductSchema,
};
