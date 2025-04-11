import { Types } from "mongoose";

export interface IBlogCategory {
  title: string;
  slug: string;
  createdBy: Types.ObjectId;
  deletedAt: Date;
  isDeleted: boolean;
}
