import { z } from "zod";
import { Types } from "mongoose";

const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

const createReferralWithdrawalZodSchema = z.object({
  body: z.object({
    referrerId: ObjectIdSchema,
    amount: z.number().min(1, "Amount must be at least 1"),
    method: z.enum(["bkash", "nagad", "bank", "cash"]),
    accountNo: z.string().min(5, "Account number is too short"),
    paymentMedium: z.enum(["personal", "agent", "merchant"]),
    note: z.string().optional(),
  }),
});

const updateReferralWithdrawalZodSchema = z.object({
  body: z.object({
    amount: z.number().min(1, "Amount must be at least 1").optional(),
    method: z.enum(["bkash", "nagad", "bank", "cash"]).optional(),
    accountNo: z.string().min(5, "Account number is too short").optional(),
    paymentMedium: z.enum(["personal", "agent", "merchant"]).optional(),
    note: z.string().optional(),
    approved: z.boolean(),
  }),
});

export const withdrawValidation = {
  createReferralWithdrawalZodSchema,
  updateReferralWithdrawalZodSchema,
};
