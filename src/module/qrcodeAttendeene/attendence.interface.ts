import { Types } from "mongoose";

export interface IAttendence {
  studentId: Types.ObjectId;
  insertTime: Date;
  batchStudent: Types.ObjectId;
  isDeleted: boolean;
}
