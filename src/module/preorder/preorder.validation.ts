import { z } from "zod";

 const createpreOrderSchema = z.object({
    body:z.object({
    user: z.string().min(1, "User ID is required"),
    selected_meals_id: z.string().min(1, "Meal ID is required"),
    total_price: z.number().nonnegative("Total price must be 0 or more"),
    pickup_time: z.string().min(1, "Pickup time is required"),
    payment_method: z.string().min(1, "Payment method is required")
})
  });

  const updatepreOrderSchema = z.object({
    body:z.object({
    user: z.string().min(1, "User ID is required").optional(),
    selected_meals_id: z.string().min(1, "Meal ID is required").optional(),
    total_price: z.number().nonnegative("Total price must be 0 or more").optional(),
    pickup_time: z.string().min(1, "Pickup time is required").optional(),
    payment_method: z.string().min(1, "Payment method is required").optional(),
    status: z.enum(["Pending", "Completed", "Cancelled"]).optional(),
})
  });

  export const preOrderValidations = {
    createpreOrderSchema,
    updatepreOrderSchema,
  }