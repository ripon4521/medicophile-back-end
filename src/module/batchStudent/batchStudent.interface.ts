import { Types } from "mongoose";

export interface IBatchStudent {
  batchId: Types.ObjectId;
  courseId: Types.ObjectId;
  studentId: Types.ObjectId;
  isDeleted: boolean;
}
