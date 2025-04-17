import { Types } from "mongoose";

export interface ICoupon {
  coupon: string;
  discountType: "Fixed" | "Percentage";
  discountAmount: number;
  status: "Active" | "Expired";
  createdBy: Types.ObjectId;
  isDeleted: boolean;
  deletedAt: Date;
}
