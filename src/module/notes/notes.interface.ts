import { Types } from "mongoose";

export interface INotes {
  slug:string;
  title: string;
  description: string;
  createdBy: Types.ObjectId;
  moduleId:Types.ObjectId;
  courseId: Types.ObjectId;
  noteFile: File;
  status: "published" | "drafted";
  deletedAt:Date;
  isDeleted:boolean | null;
}
