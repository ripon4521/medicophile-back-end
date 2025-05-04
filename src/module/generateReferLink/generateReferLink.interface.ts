import { Types } from "mongoose";

export interface IReferral {
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  isDeleted: boolean;
  deletedAt: Date;
}
