import { z } from "zod";


 const createEventSchema = z.object({
    body:z.object({

  event_name: z.string().min(3, { message: "Event name must be at least 3 characters long" }),
  date: z.coerce.date().refine((d) => d >= new Date(), {
    message: "Date must be in the future",
  }),
  time: z.string(),
  location: z.string().min(5, { message: "Location must be at least 5 characters long" }),
  organizer: z.string().min(3, { message: "Organizer name must be at least 3 characters long" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
  registration_required: z.boolean(),
  rsvp_count: z.number().int().nonnegative({ message: "RSVP count must be a non-negative integer" }),
  contact: z.object({
    name: z.string().min(3, { message: "Contact name must be at least 3 characters long" }),
    email: z.string().email({ message: "Invalid email format" }),
    phone: z.string().regex(/^\+?\d{10,15}$/, { message: "Invalid phone number format" }),
  })
  
})
});

 const updateEventSchema = z.object({
    body:z.object({
  event_name: z.string().min(3, { message: "Event name must be at least 3 characters long" }).optional(),
  date: z.coerce.date().refine((d) => d >= new Date(), {
    message: "Date must be in the future",
  }).optional(),
  time: z.string().optional(),
  location: z.string().min(5, { message: "Location must be at least 5 characters long" }).optional(),
  organizer: z.string().min(3, { message: "Organizer name must be at least 3 characters long" }).optional(),
  description: z.string().min(10, { message: "Description must be at least 10 characters long" }).optional(),
  registration_required: z.boolean().optional(),
  rsvp_count: z.number().int().nonnegative({ message: "RSVP count must be a non-negative integer" }).optional(),
  contact: z.object({
    name: z.string().min(3, { message: "Contact name must be at least 3 characters long" }).optional(),
    email: z.string().email({ message: "Invalid email format" }).optional(),
    phone: z.string().regex(/^\+?\d{10,15}$/, { message: "Invalid phone number format" }).optional(),
  }).optional()
  
})
});

export const eventValidations = {
    createEventSchema,
    updateEventSchema,
}