import { Types } from "mongoose";

export interface IGapAttemp {
  studentId: Types.ObjectId;
  examId: Types.ObjectId;
  questionId: Types.ObjectId;
  score: number;
  totalMarks: number;
  submissionStatus: "In Time" | "Late";
  submittedTime: Date;
  attemptedAt: Date;
  isDeleted: boolean;
  deletedAt: Date;
}
