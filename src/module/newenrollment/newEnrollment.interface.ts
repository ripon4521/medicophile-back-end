import { Types } from "mongoose";

export interface IEnrollment {
  name:string;
  phone:string;
  studentId?: Types.ObjectId;
  courseId: Types.ObjectId;
  batchId?:Types.ObjectId;
  paidAmont: number;
  due?:number;
  discount?:number;
  discountReason?:string;
  paymentMethod?: "cash" | "bikash" | "nagad" | "roket" | "bank";
  paymentNumber?: string;
  transctionId?: string;
  status: "active" | "blocked";
  isDeleted:boolean;
  deletedAt:Date
}
