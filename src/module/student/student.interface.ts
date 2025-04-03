import { Types } from "mongoose";


export interface IStudent {
  role: "student";
  userId: Types.ObjectId;
  profile_picture: string;
  email: string;
  phone:string;
  password: string;
  name: string;
  status: "Active" | "Blocked";
  deletedAt:Date | null;
  isDeleted: boolean;

}
