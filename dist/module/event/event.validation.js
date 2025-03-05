"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventValidations = void 0;
const zod_1 = require("zod");
const createEventSchema = zod_1.z.object({
    body: zod_1.z.object({
        event_name: zod_1.z.string().min(3, { message: "Event name must be at least 3 characters long" }),
        date: zod_1.z.coerce.date().refine((d) => d >= new Date(), {
            message: "Date must be in the future",
        }),
        time: zod_1.z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Invalid time format (HH:mm)" }),
        location: zod_1.z.string().min(5, { message: "Location must be at least 5 characters long" }),
        organizer: zod_1.z.string().min(3, { message: "Organizer name must be at least 3 characters long" }),
        description: zod_1.z.string().min(10, { message: "Description must be at least 10 characters long" }),
        registration_required: zod_1.z.boolean(),
        rsvp_count: zod_1.z.number().int().nonnegative({ message: "RSVP count must be a non-negative integer" }),
        contact: zod_1.z.object({
            name: zod_1.z.string().min(3, { message: "Contact name must be at least 3 characters long" }),
            email: zod_1.z.string().email({ message: "Invalid email format" }),
            phone: zod_1.z.string().regex(/^\+?\d{10,15}$/, { message: "Invalid phone number format" }),
        })
    })
});
const updateEventSchema = zod_1.z.object({
    body: zod_1.z.object({
        event_name: zod_1.z.string().min(3, { message: "Event name must be at least 3 characters long" }).optional(),
        date: zod_1.z.coerce.date().refine((d) => d >= new Date(), {
            message: "Date must be in the future",
        }).optional(),
        time: zod_1.z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Invalid time format (HH:mm)" }).optional(),
        location: zod_1.z.string().min(5, { message: "Location must be at least 5 characters long" }).optional(),
        organizer: zod_1.z.string().min(3, { message: "Organizer name must be at least 3 characters long" }).optional(),
        description: zod_1.z.string().min(10, { message: "Description must be at least 10 characters long" }).optional(),
        registration_required: zod_1.z.boolean().optional(),
        rsvp_count: zod_1.z.number().int().nonnegative({ message: "RSVP count must be a non-negative integer" }).optional(),
        contact: zod_1.z.object({
            name: zod_1.z.string().min(3, { message: "Contact name must be at least 3 characters long" }).optional(),
            email: zod_1.z.string().email({ message: "Invalid email format" }).optional(),
            phone: zod_1.z.string().regex(/^\+?\d{10,15}$/, { message: "Invalid phone number format" }).optional(),
        }).optional()
    })
});
exports.eventValidations = {
    createEventSchema,
    updateEventSchema,
};
