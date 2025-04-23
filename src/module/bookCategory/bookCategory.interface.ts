import { Types } from "mongoose";

export interface IBookCategory {
    slug:string;
    name:string;
    createdBy:Types.ObjectId;
    description:string;
    isDeleted:boolean;
    deletedAt:Date;
}1