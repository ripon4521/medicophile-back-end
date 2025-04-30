import { model, Schema, Types } from "mongoose";
import { ICoupon } from "./coupon.interface";

const couponSchema = new Schema<ICoupon>(
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
      default: "Active",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
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

const CouponModel = model<ICoupon>("Coupon", couponSchema);
export default CouponModel;
