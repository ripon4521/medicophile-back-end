"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noticeValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
const createNoticeSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, "Title is required"),
        message: zod_1.z.string().min(1, "Message is required"),
        createdBy: ObjectIdSchema,
        expiresAt: zod_1.z
            .date()
            .refine((date) => date > new Date(), "Expiry date must be in the future"),
        scheduleDate: zod_1.z
            .preprocess((val) => {
            if (typeof val === "string" || val instanceof Date) {
                return new Date(val);
            }
            return val;
        }, zod_1.z.date())
            .optional(),
    }),
});
const updateNoticeSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, "Title is required").optional(),
        message: zod_1.z.string().min(1, "Message is required").optional(),
        createdBy: ObjectIdSchema.optional(),
        expiresAt: zod_1.z
            .date()
            .refine((date) => date > new Date(), "Expiry date must be in the future")
            .optional(),
        scheduleDate: zod_1.z
            .preprocess((val) => {
            if (typeof val === "string" || val instanceof Date) {
                return new Date(val);
            }
            return val;
        }, zod_1.z.date())
            .optional(),
    }),
});
exports.noticeValidation = {
    createNoticeSchema,
    updateNoticeSchema,
};
