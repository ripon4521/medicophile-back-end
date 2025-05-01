import { Types } from "mongoose";

export interface ICourseReview {
    studentId:Types.ObjectId;
    courseId:Types.ObjectId;
    rating:number;
    review:string;
    isDeleted:boolean;
    deletedAt:Date;
}