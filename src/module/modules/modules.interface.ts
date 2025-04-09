import { Types } from "mongoose";

export interface IModules {
  slug: string;
  moduleTitle: string;
  courseId: Types.ObjectId;
  createdBy: Types.ObjectId;
  deletedAt: Date;
  isDeleted: boolean;
}
