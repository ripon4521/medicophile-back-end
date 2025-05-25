import { Types } from "mongoose";
import { IPaymentInfo } from "../purchaseToken/purchaseToken.interface";

export interface IOrderDetails {
  orderId: Types.ObjectId;
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  name: string;
  phone: string;
  address: string;
  quantity: number;
  price: number;
  status: "Refunded" | "Delivered" | "Courier" | "Pending" | "Processing";
  paymentStatus: "Paid" | "Pending" | "Refunded";
  paymentInfo?: IPaymentInfo;
  isDeleted: boolean;
  deletedAt: Date;
}
