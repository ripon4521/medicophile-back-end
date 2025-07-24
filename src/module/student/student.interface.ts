import { Types } from "mongoose";

interface SscInfo {
  schoolName:string;
  boardName:string;
  passingYear:string;
  sscGpa:number;
  sscRoll:string;
  sscRegeistration:string;
}


interface HscInfo {
  schoolName:string;
  boardName:string;
  passingYear:string;
  hscGpa:number;
  hscRoll:string;
  hscRegeistration:string;
}




export interface IStudent {
  role: "superAdmin" | "admin" | "teacher" | "student" | "shopManager";
  userId?: Types.ObjectId;
  profile_picture: string | null | undefined;
  email: string;
  gender: "Male" | "Female";
  phone: string;
  password: string;
  name: string;
  gurdianName: string;
  gurdianPhone: string;
  address: string;
  ssc: SscInfo;
  hsc:HscInfo;
  status: "Active" | "Blocked";
  deletedAt?: Date;
  isDeleted: boolean;
}
