import { Types } from "mongoose";

export interface ICourseReview {
    studentId:Types.ObjectId;
    rating:number;
    review:string;
}