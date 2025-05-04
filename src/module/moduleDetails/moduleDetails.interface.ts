import { Types } from "mongoose";

export interface IModuleDetails {
  courseId: Types.ObjectId;
  moduleId: Types.ObjectId;
  content_type: "Lecture" | "Notes" | "Exam";
  contentId: Types.ObjectId;
  status: "published" | "drafted";
  deletedAt: Date;
  isDeleted: boolean;
}
