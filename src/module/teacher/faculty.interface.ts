import { Types } from "mongoose";


interface IEducation {
  hscName:string;
  hscPassingYear:string;
  mbbsName:string;
  session:string;
}


export type IFaculty = {
  role: "superAdmin" | "admin" | "teacher" | "student" | "shopManager";
  userId: Types.ObjectId;
  name: string;
  phone: string;
  email: string;
  address?:string;
  education:IEducation;
  password: string;
  profile_picture?: string | null | undefined;
  gender:"Male" | "Female";
  department:string;
  demoClassLink:[string];
  exprienced:number;
  status: "Active" | "Blocked";
  deletedAt: Date;
  isDeleted: boolean;
};
