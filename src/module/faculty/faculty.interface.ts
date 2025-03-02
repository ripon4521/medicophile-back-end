import { IUser } from "../user/user.interface";

export interface IFacultyUser extends IUser {
    role: 'faculty';
    faculty_id: string;
    department: string;
    office_location: string;
    courses_taught: string[];
}