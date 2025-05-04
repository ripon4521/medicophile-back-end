import { z } from "zod";

export const whatsappMessageSchema = z.object({
  phoneNumber: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
  message: z.string().min(1, "Message is required"),
});
