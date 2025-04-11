import { Types } from "mongoose";

export interface IGapAnswer {
  examId: Types.ObjectId;
  questionId: Types.ObjectId;
  studentId: Types.ObjectId;
  answer: string;
  isDeleted: boolean;
  deletedAt: Date;
}
