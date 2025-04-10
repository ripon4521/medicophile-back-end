import { Types } from "mongoose";

export interface IGapsQuestion {
    examId:Types.ObjectId;
    createdBy:Types.ObjectId;
    question:string;
    answer:string[];
    isDeleted:boolean;
    deletedAt:Date;
}