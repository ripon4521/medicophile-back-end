"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const baseSchema = zod_1.z.object({
  coupon: zod_1.z.string({ required_error: "Coupon is required" }),
  discountType: zod_1.z.enum(["Fixed", "Percentage"], {
    required_error: "Discount type is required",
  }),
  createdBy: zod_1.z
    .string({ required_error: "CreatedBy (user ID) is required" })
    .refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
      message: "Invalid ObjectId",
    }),
  discountAmount: zod_1.z.number({
    required_error: "Discount amount is required",
  }),
});
const createCouponSchema = zod_1.z.object({
  body: baseSchema.refine(
    (data) =>
      data.discountType === "Percentage"
        ? data.discountAmount >= 1 && data.discountAmount <= 100
        : true,
    {
      message: "Percentage discount must be between 1 and 100",
      path: ["discountAmount"],
    },
  ),
});
const updateCouponSchema = zod_1.z.object({
  body: zod_1.z
    .object({
      coupon: zod_1.z.string().optional(),
      discountType: zod_1.z.enum(["Fixed", "Percentage"]).optional(),
      discountAmount: zod_1.z.number().optional(),
      status: zod_1.z.enum(["Active", "Expired"]).optional(),
    })
    .refine(
      (data) =>
        data.discountType === "Percentage" && data.discountAmount !== undefined
          ? data.discountAmount >= 1 && data.discountAmount <= 100
          : true,
      {
        message: "Percentage discount must be between 1 and 100",
        path: ["discountAmount"],
      },
    ),
});
exports.couponValidation = {
  createCouponSchema: createCouponSchema,
  updateCouponSchema: updateCouponSchema,
};
