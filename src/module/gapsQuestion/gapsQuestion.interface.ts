import { Types } from "mongoose";

export interface IGapsQuestion {
  examId: Types.ObjectId;
  createdBy: Types.ObjectId;
  question: string;
  answer: string[];
  duration: number;
  mark: number;
  isDeleted: boolean;
  deletedAt: Date;
}
