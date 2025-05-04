import { Types } from "mongoose";

export interface IReferDetails {
  referrerId: Types.ObjectId;
  referredUserId: Types.ObjectId;
  courseId: Types.ObjectId;
  purchaseTokenId: Types.ObjectId;
  referredAt: Date;
  isDeleted: boolean;
  deletedAt: Date;
}
