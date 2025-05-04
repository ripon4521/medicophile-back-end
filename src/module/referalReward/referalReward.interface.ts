import { Types } from "mongoose";

export interface IReferralReward  {
    referDetailsId: Types.ObjectId;
    amount: number;
    isPaid: boolean;
    paidAt?: Date;
    note?: string;
    isDeleted:boolean;
    deletedAt:Date;
  }