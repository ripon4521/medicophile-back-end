import { Types } from "mongoose";

export interface IEnrollment {
  studentId: Types.ObjectId;
  courseId: Types.ObjectId;
  paidAmont: number;
  paymentMethod: "cash" | "bikash" | "nagad" | "roket";
  paymentNumber?:string;
  transctionId?:string;
  status: "active" | "blocked";
}
