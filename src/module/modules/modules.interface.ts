import { Types } from "mongoose";

export interface IModules {
    serialNumber:number;
    moduleTitle:string;
    description:string;
    courseId:Types.ObjectId;
    createdBy:Types.ObjectId;
    status:'published'|'drafted';
    launchingDate:string;
}