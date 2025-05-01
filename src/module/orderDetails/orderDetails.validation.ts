
import { z } from "zod";

export const updateOrderDetailsZodSchema = z.object({
  body: z.object({
    status: z.enum(["Refunded", "Delivered", "Courier"]).optional(),
    paymentStatus: z.enum(["Paid", "Pending", "Refunded"]).optional(),

  }),
});
