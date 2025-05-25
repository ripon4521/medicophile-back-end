import { Types } from "mongoose";

export type IAdmin = {
  role: "superAdmin" | "admin" | "teacher" | "student" | "shopManager";
  userId: Types.ObjectId;
  name: string;
  phone: string;
  email: string;
  password: string;
  profile_picture?: string | null | undefined;
  status: "Active" | "Blocked";
  deletedAt: Date;
  isDeleted: boolean;
};
