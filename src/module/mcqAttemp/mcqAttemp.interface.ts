import { Types } from "mongoose";

export interface IAttemp {
  questionId: Types.ObjectId;
  selectedAnswer: string;
}

export interface IMcqAttemp {
  answer: IAttemp[];
  studentId: Types.ObjectId;
  examId?: Types.ObjectId;
  totalScore?: number;
  totalAttemp?: number;
  correctCount?: number;
  wrongCount?: number;
  isDeleted?: boolean;
  deletedAt?: Date;
}
