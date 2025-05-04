"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IReferralSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
// ObjectId validation
const ObjectId = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
});
// Referral Schema
exports.IReferralSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: ObjectId,
        courseId: ObjectId,
        courseSlug: zod_1.z.string().min(1, { message: "Course slug is required" }),
    }),
});
