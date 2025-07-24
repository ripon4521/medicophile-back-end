import { Types } from "mongoose";

export interface IUserCredebtials {
  studentId: Types.ObjectId;
  email: string;
  ipAddress: string;
  accessToken: string;
  refreshToken: string;
  deviceType: string;
  deviceName: string;
  deletedAt: Date | null;
  isDeleted: boolean;
}
