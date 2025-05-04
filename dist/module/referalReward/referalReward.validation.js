"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.referalRewardValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
const createReferralRewardZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        referDetailsId: ObjectIdSchema,
        amount: zod_1.z.number().min(0, "Amount must be a positive number"),
        note: zod_1.z.string().optional(),
    }),
});
const updateReferralRewardZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        amount: zod_1.z.number().min(0, "Amount must be a positive number").optional(),
        note: zod_1.z.string().optional(),
    }),
});
exports.referalRewardValidation = {
    createReferralRewardZodSchema,
    updateReferralRewardZodSchema,
};
