import { Types } from "mongoose";

export interface ICqQuestion {
  examId: Types.ObjectId;
  createdBy: Types.ObjectId;
  question: string;
  status: "Published" | "Drafted";
  validTime:number;
  isDeleted: boolean;
  deletedAt: Date;
}
