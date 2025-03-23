import { Types } from "mongoose";


export interface INotes {
    noteTitle:string;
    description:string;
    createdBy:Types.ObjectId;
    courseId:Types.ObjectId;
    noteFile:File;
    classTime:string;
    launchingDate:string;
    status:'published'|'drafted';
}
