import { Types } from "mongoose";


export interface IExam {
    examTitle:string;
    description:string;
    createdBy:Types.ObjectId;
    courseId:Types.ObjectId;
    examType:'MCQ'|'CQ'|'Fill in the gaps';
    TotalQuestion:number;
    positiveMark:number;
    negativeMark:number;
    duration:number;
    launchingDate:string;
    validDate:string;
    status:'published'|'drafted';
}
