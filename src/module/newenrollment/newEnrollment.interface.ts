import { Types } from "mongoose";

export interface IEnrollment {
   studentId:Types.ObjectId;
   courseId:Types.ObjectId;
   paidAmont:number;
   paymentMethod:'cash'| 'bikash'| 'nagad' | 'roket';
   status:'active' | 'blocked'
  }
  