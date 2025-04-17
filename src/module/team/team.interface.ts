import { Types } from "mongoose";

export interface ITeams {
  slug: string;
  name: string;
  description: string;
  profileImg: string;
  createdBy: Types.ObjectId;
  status: "Active" | "Inactive" | "Archived";
  members: Types.ObjectId[];
  deletedAt: Date;
  isDeleted: boolean;
}
