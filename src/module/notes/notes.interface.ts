import { Types } from "mongoose";

export interface INotes {
  slug: string;
  title: string;
  description: string;
  createdBy: Types.ObjectId;
  moduleId: Types.ObjectId;
  courseId: Types.ObjectId;
  noteFile: string;
  status: "Published" | "Drafted";
  scheduleDate:Date;
  deletedAt: Date;
  isDeleted: boolean;
}
