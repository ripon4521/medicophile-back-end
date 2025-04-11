import { Types } from "mongoose";

export interface IMedia {
    slug:string;
    title:string;
    media:string;
    createdBy:Types.ObjectId;
    isDeleted:boolean;
    deletedAt:Date;
}