import { Types } from "mongoose";

export interface IBlog {
    slug:string;
    title:string;
    description:string;
    categoryId:Types.ObjectId;
    createdBy:Types.ObjectId;
    tags:string[];
    status:"Published" | "Drafted";
    coverPhoto:string;
    isDeleted:boolean;
    deletedAt:Date;
}