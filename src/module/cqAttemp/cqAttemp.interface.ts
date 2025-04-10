import { Types } from "mongoose";

export interface ICqAttemps {
    studentId:Types.ObjectId;
    examId:Types.ObjectId;
    questionId:Types.ObjectId;
    submitedPdf:string;
    score:number;
    submissionStatus:'In Time' | 'Late';
    submittedTime:Date;
    isDeleted:boolean;
    deletedAt:Date;

}