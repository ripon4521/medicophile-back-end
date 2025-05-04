"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whatsappMessageSchema = void 0;
const zod_1 = require("zod");
exports.whatsappMessageSchema = zod_1.z.object({
    phoneNumber: zod_1.z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
    message: zod_1.z.string().min(1, "Message is required"),
});
