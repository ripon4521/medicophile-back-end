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
    insertBy:Types.ObjectId;
    insertDate:Date;
    positiveMark:number;
    negetiveMark:number;
    isDeleted:boolean;
    deletedAt:Date;
}