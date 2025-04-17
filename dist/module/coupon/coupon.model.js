"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const couponSchema = new mongoose_1.Schema(
  {
    coupon: {
      type: String,
      required: [true, "Coupon  is required"],
    },
    discountType: {
      type: String,
      enum: ["Fixed", "Percentage"],
      required: [true, "Discount type is required"],
    },
    discountAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Expired"],
      required: [true, "Status is required"],
    },
    createdBy: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "CreatedBy is required"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  },
);
const CouponModel = (0, mongoose_1.model)("Coupon", couponSchema);
exports.default = CouponModel;
