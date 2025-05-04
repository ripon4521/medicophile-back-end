import { Types } from "mongoose";

export interface IReferralWithdrawal {
  referrerId: Types.ObjectId;
  amount: number;
  method: "bkash" | "nagad" | "bank" | "cash";
  accountNo?: string;
  paymentMedium?: "personal" | "agent" | "merchant";
  requestDate: Date;
  approved: boolean;
  approvedAt?: Date;
  note?: string;
  isDeleted: boolean;
  deletedAt?: Date;
}
