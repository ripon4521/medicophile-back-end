import { z } from "zod";
import mongoose from "mongoose";

const createCouponSchema = z.object({
  coupon: z.string({ required_error: "Coupon  is required" }),
  discountType: z.enum(["Fixed", "Percentage"], {
    required_error: "Discount type is required",
  }),
  status: z.enum(["Active", "Expired"], {
    required_error: "Status is required",
  }),
  createdBy: z
    .string({ required_error: "CreatedBy (user ID) is required" })
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid ObjectId",
    }),
});

const updateCouponSchema = z.object({
  coupon: z.string({ required_error: "Coupon  is required" }).optional(),
  discountType: z
    .enum(["Fixed", "Percentage"], {
      required_error: "Discount type is required",
    })
    .optional(),
  discountAmount: z
    .number({ required_error: "Discount amount is required" })
    .optional(),
  status: z
    .enum(["Active", "Expired"], {
      required_error: "Status is required",
    })
    .optional(),
});

export const couponValidation = {
  createCouponSchema,
  updateCouponSchema,
};
