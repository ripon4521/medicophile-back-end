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
const createCouponSchema = zod_1.z.object({
  coupon: zod_1.z.string({ required_error: "Coupon  is required" }),
  discountType: zod_1.z.enum(["Fixed", "Percentage"], {
    required_error: "Discount type is required",
  }),
  status: zod_1.z.enum(["Active", "Expired"], {
    required_error: "Status is required",
  }),
  createdBy: zod_1.z
    .string({ required_error: "CreatedBy (user ID) is required" })
    .refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
      message: "Invalid ObjectId",
    }),
});
const updateCouponSchema = zod_1.z.object({
  coupon: zod_1.z.string({ required_error: "Coupon  is required" }).optional(),
  discountType: zod_1.z
    .enum(["Fixed", "Percentage"], {
      required_error: "Discount type is required",
    })
    .optional(),
  discountAmount: zod_1.z
    .number({ required_error: "Discount amount is required" })
    .optional(),
  status: zod_1.z
    .enum(["Active", "Expired"], {
      required_error: "Status is required",
    })
    .optional(),
});
exports.couponValidation = {
  createCouponSchema,
  updateCouponSchema,
};
