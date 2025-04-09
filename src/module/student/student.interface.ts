import { Types } from "mongoose";

export interface IStudent {
  role: "superAdmin" | "admin" | "teacher" | "student";
  userId: Types.ObjectId;
  profile_picture: string | null | undefined;
  email: string;
  phone: string;
  password: string;
  name: string;
  gurdianName: string;
  gurdianPhone: string;
  address: string;
  status: "Active" | "Blocked";
  deletedAt: Date;
  isDeleted: boolean;
}
