import { Types } from "mongoose";

export interface IOfflineBatch {
    slug:string;
    name:string;
    courseId:Types.ObjectId;
    isDeleted:boolean;
    deletedAt:Date;
}