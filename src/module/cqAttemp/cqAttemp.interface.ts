import { Types } from "mongoose";

export interface ICqAttemps {
    studentId:Types.ObjectId;
    examId:Types.ObjectId;
    checkedBy:Types.ObjectId;
    submitedPdf:string;
    score:number;
    submissionStatus:'In Time' | 'Late';
    startTime:Date;
    submittedTime:Date;
    isDeleted:boolean;
    deletedAt:Date;

}