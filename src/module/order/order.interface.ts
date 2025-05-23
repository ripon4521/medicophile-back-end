import { Types } from "mongoose";
import { IPaymentInfo } from "../purchaseToken/purchaseToken.interface";

export interface IOrder {
  name: string;
  phone: string;
  address: string;
  status: "Cancel" | "Processing" | "Courier" | "Delivered";
  paymentStatus: "Paid";
  paymentInfo?: IPaymentInfo;
  subTotal: number;
  discount: number;
  coupoun: Types.ObjectId;
  userId?: Types.ObjectId;
  productId: Types.ObjectId;
  quantity: number;
  charge: number;
  shiping: number;
  totalAmount: number;
  paidAmount: number;
  isDeleted: boolean;
  deletedAt: Date;
}
