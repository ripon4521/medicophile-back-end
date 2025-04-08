import { Types } from "mongoose";

export type IFaculty = {
  role: "superAdmin" | "admin" | "teacher";
  userId: Types.ObjectId;
  name: string;
  phone: string;
  email: string;
  password: string;
  profile_picture?: string | null | undefined;
  status: "Active" | "Blocked";
  deletedAt: Date | null;
  isDeleted: boolean;
};
