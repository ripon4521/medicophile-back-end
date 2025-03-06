import { Types } from "mongoose";
import { IUser } from "../user/user.interface";

export interface IFacultyUser extends IUser {
    // user infoamtion
    role: 'faculty';
    user: Types.ObjectId;
    name: string;
    gmail: string;
    password: string;
    contact: string;
    address: string;
    profile_picture?: string;
    status: "unblocked" | "blocked";
    // faculty infomation 
    faculty_id: string;
    department: string;
    office_location: string;
    courses_taught: string[];
}
