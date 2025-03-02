import { z } from "zod";

 const createBusValidationSchema = z.object({
  body: z.object({
    route_id: z.string().min(1, "Route ID is required"),
    route_name: z.string().min(1, "Route name is required"),
    stops: z
      .array(
        z.object({
          stop_name: z.string().min(1, "Stop name is required"),
          arrival_time: z
            .string()
            .regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)"),
          departure_time: z
            .string()
            .regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)"),
        })
      )
      .min(1, "At least one stop is required"),
    bus_number: z.string().min(1, "Bus number is required"),
    driver_name: z.string().min(1, "Driver name is required"),
    contact: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid contact number"),
    status: z.enum(["On Time", "Delayed", "Cancelled"]),
  }),
});

 const updateBusValidationSchema = z.object({
  body: z.object({
    route_id: z.string().min(1, "Route ID is required").optional(),
    route_name: z.string().min(1, "Route name is required").optional(),
    stops: z
      .array(
        z.object({
          stop_name: z.string().min(1, "Stop name is required").optional(),
          arrival_time: z
            .string()
            .regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)").optional(),
          departure_time: z
            .string()
            .regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)").optional(),
        })
      )
      .min(1, "At least one stop is required").optional(),
    bus_number: z.string().min(1, "Bus number is required").optional(),
    driver_name: z.string().min(1, "Driver name is required").optional(),
    contact: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid contact number").optional(),
    status: z.enum(["On Time", "Delayed", "Cancelled"]).optional(),
  }),
});







export const busValidations = {
    createBusValidationSchema,
    updateBusValidationSchema

}