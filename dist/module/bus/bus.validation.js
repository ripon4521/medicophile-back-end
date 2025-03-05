"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.busValidations = void 0;
const zod_1 = require("zod");
const createBusValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        route_id: zod_1.z.string().min(1, "Route ID is required"),
        route_name: zod_1.z.string().min(1, "Route name is required"),
        stops: zod_1.z
            .array(zod_1.z.object({
            stop_name: zod_1.z.string().min(1, "Stop name is required"),
            arrival_time: zod_1.z
                .string()
                .regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)"),
            departure_time: zod_1.z
                .string()
                .regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)"),
        }))
            .min(1, "At least one stop is required"),
        bus_number: zod_1.z.string().min(1, "Bus number is required"),
        driver_name: zod_1.z.string().min(1, "Driver name is required"),
        contact: zod_1.z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid contact number"),
        status: zod_1.z.enum(["On Time", "Delayed", "Cancelled"]),
    }),
});
const updateBusValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        route_id: zod_1.z.string().min(1, "Route ID is required").optional(),
        route_name: zod_1.z.string().min(1, "Route name is required").optional(),
        stops: zod_1.z
            .array(zod_1.z.object({
            stop_name: zod_1.z.string().min(1, "Stop name is required").optional(),
            arrival_time: zod_1.z
                .string()
                .regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)").optional(),
            departure_time: zod_1.z
                .string()
                .regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)").optional(),
        }))
            .min(1, "At least one stop is required").optional(),
        bus_number: zod_1.z.string().min(1, "Bus number is required").optional(),
        driver_name: zod_1.z.string().min(1, "Driver name is required").optional(),
        contact: zod_1.z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid contact number").optional(),
        status: zod_1.z.enum(["On Time", "Delayed", "Cancelled"]).optional(),
    }),
});
exports.busValidations = {
    createBusValidationSchema,
    updateBusValidationSchema
};
