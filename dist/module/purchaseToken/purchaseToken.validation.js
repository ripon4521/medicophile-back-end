"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseTokenValidation = exports.paymentInfoSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const ObjectIdSchema = zod_1.z
  .string()
  .refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
  });
// Payment Info Validation
exports.paymentInfoSchema = zod_1.z.object({
  transactionId: zod_1.z.string({
    required_error: "Transaction ID is required",
  }),
  method: zod_1.z.enum(["Bkash", "Nagad", "Bank", "Cash"], {
    required_error: "Payment method is required",
  }),
  accountNumber: zod_1.z.string({
    required_error: "account number is requried",
  }),
  paymentMedium: zod_1.z.enum(["personal", "agent", "merchant"]).optional(),
  proofUrl: zod_1.z.string().url("Invalid proof URL").optional(),
});
const createPurchaseTokenSchema = zod_1.z.object({
  body: zod_1.z.object({
    studentId: ObjectIdSchema,
    courseId: ObjectIdSchema,
    coupon: zod_1.z.string().optional(),
    price: zod_1.z.number({ required_error: "Price is required" }),
    subtotal: zod_1.z.number({ required_error: "Subtotal is required" }),
    discount: zod_1.z.number({ required_error: "Discount is required" }),
    charge: zod_1.z.number({ required_error: "Charge is required" }),
    totalAmount: zod_1.z.number({ required_error: "Total amount is required" }),
    paymentInfo: exports.paymentInfoSchema,
    name: zod_1.z.string({ required_error: "Name is required" }),
    phone: zod_1.z.string({ required_error: "Phone is required" }),
  }),
});
const updatePurchaseTokenSchema = zod_1.z.object({
  body: zod_1.z.object({
    studentId: ObjectIdSchema.optional(),
    courseId: ObjectIdSchema.optional(),
    status: zod_1.z
      .enum(["Verified", "Unverified", "Rejected"], {
        required_error: "Status is required",
      })
      .optional(),
    purchaseToken: zod_1.z
      .string({ required_error: "Purchase token is required" })
      .optional(),
    coupon: zod_1.z.string().optional(),
    price: zod_1.z.number({ required_error: "Price is required" }).optional(),
    subtotal: zod_1.z
      .number({ required_error: "Subtotal is required" })
      .optional(),
    discount: zod_1.z
      .number({ required_error: "Discount is required" })
      .optional(),
    charge: zod_1.z.number({ required_error: "Charge is required" }).optional(),
    totalAmount: zod_1.z
      .number({ required_error: "Total amount is required" })
      .optional(),
    issuedBy: ObjectIdSchema.optional(),
    paymentInfo: exports.paymentInfoSchema.optional(),
    name: zod_1.z.string({ required_error: "Name is required" }).optional(),
    phone: zod_1.z.string({ required_error: "Phone is required" }).optional(),
  }),
});
exports.purchaseTokenValidation = {
  createPurchaseTokenSchema,
  updatePurchaseTokenSchema,
};
