import { Types } from "mongoose";

type Address = {
    district: string;
    division: string;
  };
  
  type SubjectTaught = {
    class: number;
    subjects: string[];
  };
  
 export type IFaculty = {
    role:"faculty";
    userId:Types.ObjectId;
    full_name: string;
    gmail: string;
    password:string;
    contact: string;
    gender: "Male" | "Female" | "Other";
    date_of_birth: string;
    profile_picture:string;
    religion: string;
    address: string;
    district:string;
    division:string;
    qualifications: string[];
    experience: string;
    subjects_taught: SubjectTaught[];
    joining_date: string;
    status: "blocked" | "unblocked";
  };
  