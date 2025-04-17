import { Types } from "mongoose";

export interface IGapAttemp {
  studentId: Types.ObjectId;
  examId: Types.ObjectId;
  questionId: Types.ObjectId;
  score: number;
  totalMarks: number;
  submittedTime: Date;
  attemptedAt: Date;
  isDeleted: boolean;
  deletedAt: Date;
}
