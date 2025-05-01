"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderDetailsZodSchema = void 0;
const zod_1 = require("zod");
exports.updateOrderDetailsZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["Refunded", "Delivered", "Courier"]).optional(),
        paymentStatus: zod_1.z.enum(["Paid", "Pending", "Refunded"]).optional(),
    }),
});
