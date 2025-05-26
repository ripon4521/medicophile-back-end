import { Types } from "mongoose";

export interface IExam {
  slug: string;
  examTitle: string;
  createdBy: Types.ObjectId;
  courseId: Types.ObjectId;
  moduleId: Types.ObjectId;
  examType: "MCQ" | "CQ" | "Fill in the gaps";
  totalQuestion: number;
  positiveMark: number;
  negativeMark: number;
  mcqDuration: number;
  cqMark: number;
  resultStatus: "pending" | "completed" | "failed";
  validTime?: string;
  status: "published" | "drafted";
  scheduleDate: Date;
  createdAt?:Date;
  deletedAt: Date;
  isDeleted: boolean;
}
