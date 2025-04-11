import { Types } from "mongoose";

export interface ITeams {
    name:string;
    description:string;
    profileImg:string;
    createdBy:Types.ObjectId;
    deletedAt:Date;
    isDeleted:boolean;
}