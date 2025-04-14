import { Types } from "mongoose";

export interface IBlogComment {
    slug:string
    userType:"admin" | "student" | "teacher";
    userId:Types.ObjectId;
    blogId:Types.ObjectId;
    comment:string;
    status:"approved" | "pending" | "rejected";
    isDeleted:boolean;
    deletedAt:Date;
}