import { Types } from "mongoose";

export interface ILiveClass {
  slug: string;
  courseId: Types.ObjectId;
  createdBy: Types.ObjectId;
  title: string;
  link: string;
  description: string;
  status: "Published" | "Drafted";
  isDeleted: boolean;
  deletedAt: Date;
}
