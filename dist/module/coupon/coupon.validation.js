"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
});
// Helper: optional string that can be empty or non-empty
const optionalNonEmptyString = zod_1.z.union([zod_1.z.string().min(1), zod_1.z.literal("")]).optional();
// Helper: optional number that can be empty string (treated as undefined)
const optionalNumberOrEmptyString = zod_1.z.union([zod_1.z.number(), zod_1.z.literal("")]).optional();
const baseSchema = zod_1.z.object({
    coupon: zod_1.z.string({ required_error: "Coupon is required" }),
    discountType: zod_1.z.enum(["Fixed", "Percentage"], {
        required_error: "Discount type is required",
    }),
    createdBy: ObjectIdSchema,
    discountAmount: zod_1.z.number({ required_error: "Discount amount is required" }),
});
const createCouponSchema = zod_1.z.object({
    body: baseSchema.refine((data) => data.discountType === "Percentage"
        ? data.discountAmount >= 1 && data.discountAmount <= 100
        : true, {
        message: "Percentage discount must be between 1 and 100",
        path: ["discountAmount"],
    }),
});
const updateCouponSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        coupon: optionalNonEmptyString,
        discountType: zod_1.z.enum(["Fixed", "Percentage"]).optional(),
        discountAmount: optionalNumberOrEmptyString,
        status: zod_1.z.enum(["Active", "Expired"]).optional(),
    })
        .refine((data) => data.discountType === "Percentage" &&
        data.discountAmount !== undefined &&
        data.discountAmount !== ""
        ? Number(data.discountAmount) >= 1 && Number(data.discountAmount) <= 100
        : true, {
        message: "Percentage discount must be between 1 and 100",
        path: ["discountAmount"],
    }),
});
exports.couponValidation = {
    createCouponSchema: createCouponSchema,
    updateCouponSchema: updateCouponSchema,
};
