import { Types } from "mongoose";

export interface ICqAttemps {
  studentId: Types.ObjectId;
  examId: Types.ObjectId;
  questionId: Types.ObjectId;
  submitedPdf: string;
  score: number;
  submittedTime: Date;
  isDeleted: boolean;
  deletedAt: Date;
}
