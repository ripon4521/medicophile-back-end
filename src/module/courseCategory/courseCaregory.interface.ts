import { Types } from "mongoose";

export interface ICourseCategory {
  title: string;
  slug: string;
  cover_photo: string;
  createdBy: Types.ObjectId;
  deletedAt: Date;
  isDeleted: boolean;
}
