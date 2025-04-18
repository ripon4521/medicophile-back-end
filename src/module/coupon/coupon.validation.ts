import { z, AnyZodObject } from 'zod';
import mongoose from 'mongoose';

const baseSchema = z.object({
  coupon: z.string({ required_error: "Coupon is required" }),
  discountType: z.enum(["Fixed", "Percentage"], {
    required_error: "Discount type is required",
  }),
  createdBy: z
    .string({ required_error: "CreatedBy (user ID) is required" })
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid ObjectId",
    }),
  discountAmount: z.number({ required_error: "Discount amount is required" }),
});

const createCouponSchema = z.object({
  body: baseSchema.refine(
    (data) =>
      data.discountType === "Percentage"
        ? data.discountAmount >= 1 && data.discountAmount <= 100
        : true,
    {
      message: "Percentage discount must be between 1 and 100",
      path: ["discountAmount"],
    }
  ),
});

const updateCouponSchema = z.object({
  body: z
    .object({
      coupon: z.string().optional(),
      discountType: z.enum(["Fixed", "Percentage"]).optional(),
      discountAmount: z.number().optional(),
      status: z.enum(["Active", "Expired"]).optional(),
    })
    .refine(
      (data) =>
        data.discountType === "Percentage" && data.discountAmount !== undefined
          ? data.discountAmount >= 1 && data.discountAmount <= 100
          : true,
      {
        message: "Percentage discount must be between 1 and 100",
        path: ["discountAmount"],
      }
    ),
});

export const couponValidation = {
  createCouponSchema: createCouponSchema as unknown as AnyZodObject,
  updateCouponSchema: updateCouponSchema as unknown as AnyZodObject,
};
