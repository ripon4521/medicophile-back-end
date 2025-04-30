import { Types } from "mongoose";
import { IPaymentInfo } from "../purchaseToken/purchaseToken.interface";

export interface IPurchase {
  studentId: Types.ObjectId;
  courseId: Types.ObjectId;
  paymentInfo: IPaymentInfo;
  status: "Archive" | "Course Out" | "Active";
  paymentStatus: "Paid" | "Pending" | "Partial" | "Refunded" | "Rejected";
  purchaseToken: Types.ObjectId;
  subtotal: number;
  discount: number;
  charge: number;
  totalAmount: number;
  issuedBy: Types.ObjectId;
  isDeleted: boolean;
  deletedAt: Date;
}
