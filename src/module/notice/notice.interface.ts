import { Types } from "mongoose";

export interface INotice {
  slug: string;
  title: string;
  message: string;
  createdBy: Types.ObjectId;
  expiresAt: Date;
  scheduleDate: Date;
  isExpire: boolean;
  isDeleted: boolean;
  deletedAt: Date;
}
