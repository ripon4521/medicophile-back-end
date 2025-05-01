"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderDetailsZodSchema = void 0;
const zod_1 = require("zod");
exports.orderDetailsZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["Refunded", "Delivered", "Courier"]).optional(),
        paymentStatus: zod_1.z.enum(["Paid", "Pending", "Refunded"]).optional(),
    }),
});
