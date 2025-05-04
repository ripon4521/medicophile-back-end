import { z } from "zod";
import { Types } from "mongoose";

const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

const createReferralRewardZodSchema = z.object({
  body: z.object({
    referDetailsId: ObjectIdSchema,
    amount: z.number().min(0, "Amount must be a positive number"),
    note: z.string().optional(),
  }),
});

const updateReferralRewardZodSchema = z.object({
  body: z.object({
    amount: z.number().min(0, "Amount must be a positive number").optional(),
    note: z.string().optional(),
  }),
});

export const referalRewardValidation = {
  createReferralRewardZodSchema,
  updateReferralRewardZodSchema,
};
