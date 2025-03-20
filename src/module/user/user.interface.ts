import { USER_ROLE, USER_STATUS } from "./user.constants";

export interface IUser {
  name: string;
  gmail: string;
  password: string;
  district:string;
  division:string;
  contact: string;
  gender: string;
  date_of_birth: string;
  religion: string;
  address: string;
  role: 'admin' | 'student' | 'faculty' ;
  profile_picture?: string;
  registration_date: Date;
  last_login?: Date;
  status: "unblocked" | "blocked";
}
export type TUserRole = keyof typeof USER_ROLE;
export type TUserStatus = keyof typeof USER_STATUS;