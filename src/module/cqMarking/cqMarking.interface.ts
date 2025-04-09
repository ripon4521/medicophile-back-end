import { Types } from "mongoose";

export interface ICqMarking {
    studentId:Types.ObjectId;
    examId:Types.ObjectId;
    questionId:Types.ObjectId;
    score:number;
    comment:string;
    isDeleted:boolean;
    deletedAt:Date;
}