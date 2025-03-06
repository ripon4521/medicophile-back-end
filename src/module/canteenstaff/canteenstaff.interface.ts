import { Types } from "mongoose";
import { IUser } from "../user/user.interface";

export interface ICanteenstaffUser extends IUser {
  // user infoamtion
  role: 'canteen_staff';
  user: Types.ObjectId;
  name: string;
  gmail: string;
  password: string;
  contact: string;
  address: string;
  profile_picture?: string;
  status: "unblocked" | "blocked";
  // Canteenstaff infomation 
  staff_id: string;
  canteen_section: string;
  shift_timing: string;
}
