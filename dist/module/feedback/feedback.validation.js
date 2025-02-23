"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackValidation = void 0;
const zod_1 = require("zod");
// Feedback Zod Schema
const createFeedback = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.string().min(1, { message: "User ID is required" }), // Reference to User ID
        rating: zod_1.z.number()
            .min(1, { message: "Rating must be at least 1" })
            .max(5, { message: "Rating cannot exceed 5" }), // 1 to 5 rating
        comment: zod_1.z.string().optional(), // Optional comment
    })
});
const updateFeedback = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.string().min(1, { message: "User ID is required" }), // Reference to User ID
        rating: zod_1.z.number()
            .min(1, { message: "Rating must be at least 1" })
            .max(5, { message: "Rating cannot exceed 5" }), // 1 to 5 rating
        comment: zod_1.z.string().optional(), // Optional comment
    })
});
exports.feedbackValidation = {
    createFeedback,
    updateFeedback,
};
