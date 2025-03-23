import { Types } from "mongoose";


export interface INotes {
    noteTitle:string;
    description:string;
    createdBy:Types.ObjectId;
    courseId:Types.ObjectId;
    noteFile:File;
    TotalQuestion:number;
    classTime:string;
    launchingDate:string;
    status:'published'|'drafted';
}
