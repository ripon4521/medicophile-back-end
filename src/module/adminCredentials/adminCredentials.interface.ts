import { Types } from "mongoose";

export interface IAdminCredential {
  userId: Types.ObjectId;
  phone: string;
  otp: number;
  ipAddress: string;
  deviceType: string;
  token: string;
}
