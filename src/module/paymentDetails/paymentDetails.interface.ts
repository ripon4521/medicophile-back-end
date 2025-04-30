import { Types } from "mongoose";
import { IPaymentInfo } from "../purchaseToken/purchaseToken.interface";

export interface IPaymentDetails {
  purchaseId: Types.ObjectId;
  studentId: Types.ObjectId;
  paidAmount: number;
  paymentInfo: IPaymentInfo;
  isDeleted: boolean;
  deletedAt: Date;
}
