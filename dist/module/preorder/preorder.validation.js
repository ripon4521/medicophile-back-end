"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preOrderValidations = void 0;
const zod_1 = require("zod");
const createpreOrderSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.string().min(1, "User ID is required"),
        selected_meals_id: zod_1.z.string().min(1, "Meal ID is required"),
        total_price: zod_1.z.number().nonnegative("Total price must be 0 or more"),
        pickup_time: zod_1.z.string().min(1, "Pickup time is required"),
        payment_method: zod_1.z.string().min(1, "Payment method is required")
    })
});
const updatepreOrderSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.string().min(1, "User ID is required").optional(),
        selected_meals_id: zod_1.z.string().min(1, "Meal ID is required").optional(),
        total_price: zod_1.z.number().nonnegative("Total price must be 0 or more").optional(),
        pickup_time: zod_1.z.string().min(1, "Pickup time is required").optional(),
        payment_method: zod_1.z.string().min(1, "Payment method is required").optional(),
        status: zod_1.z.enum(["Pending", "Completed", "Cancelled"]).optional(),
    })
});
exports.preOrderValidations = {
    createpreOrderSchema,
    updatepreOrderSchema,
};
