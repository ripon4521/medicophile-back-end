import { Types } from "mongoose";


export interface IMcqQuestion {
    examId:Types.ObjectId;
    question:string;
    questionImg:string;
    options:[string];
    correctAnswer: string;
    explaination:string;
    tags:[string],
    subject:string;
    questionType:string;
    questionCategory:string;
    questionCount:number;
    insertBy:Types.ObjectId;
    insertDate:Date;
    isDeleted:boolean;
    deletedAt:Date;
}