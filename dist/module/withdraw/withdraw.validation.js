"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
const createReferralWithdrawalZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        referrerId: ObjectIdSchema,
        amount: zod_1.z.number().min(1, "Amount must be at least 1"),
        method: zod_1.z.enum(["bkash", "nagad", "bank", "cash"]),
        accountNo: zod_1.z.string().min(5, "Account number is too short"),
        paymentMedium: zod_1.z.enum(["personal", "agent", "merchant"]),
        note: zod_1.z.string().optional(),
    }),
});
const updateReferralWithdrawalZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        amount: zod_1.z.number().min(1, "Amount must be at least 1").optional(),
        method: zod_1.z.enum(["bkash", "nagad", "bank", "cash"]).optional(),
        accountNo: zod_1.z.string().min(5, "Account number is too short").optional(),
        paymentMedium: zod_1.z.enum(["personal", "agent", "merchant"]).optional(),
        note: zod_1.z.string().optional(),
        approved: zod_1.z.boolean(),
    }),
});
exports.withdrawValidation = {
    createReferralWithdrawalZodSchema,
    updateReferralWithdrawalZodSchema,
};
