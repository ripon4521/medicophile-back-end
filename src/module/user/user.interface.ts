import { USER_ROLE, USER_STATUS } from "./user.constants";

export interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "superAdmin" | "admin" | "teacher" | "student" | "shop manager";
  profile_picture?: string | null | undefined;
  status: "Active" | "Blocked";
  isDeleted: boolean;
  pin: string;
  deletedAt: Date | null;
}
export type TUserRole = keyof typeof USER_ROLE;
export type TUserStatus = keyof typeof USER_STATUS;
