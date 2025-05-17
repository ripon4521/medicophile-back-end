import { Types } from "mongoose";

export interface IPaymentInfo {
  transactionId?: string;
  method?: "Bkash" | "Nagad" | "Bank" | "Cash";
  accountNumber?: string;
  paymentMedium?: "personal" | "agent" | "merchant";
  paymentDate?: Date;
  proofUrl?: string;
}

export interface IPurchaseToken {
  studentId: Types.ObjectId;
  courseId: Types.ObjectId;
  status:
    | "Verified"
    | "Unverified"
    | "Rejected"
    | "Pending"
    | "Refunded"
    | "Partial";
  purchaseToken: string;
  coupon?: string;
  ref?: Types.ObjectId;
  price: number;
  subtotal: number;
  discount: number;
  charge: number;
  totalAmount: number;
  paymentInfo?: IPaymentInfo;
  name: string;
  phone: string;
  isDeleted: boolean;
  deletedAt: Date;
}
