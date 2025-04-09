import { Types } from "mongoose";

export interface ICqQuestion {
    examId:Types.ObjectId;
    createdBy:Types.ObjectId;
    question:string;
    status:'Published' | 'Drafted';
    isDeleted:boolean;
    deletedAt:Date;
    
}