import { Types } from "mongoose";

export interface IModuleDetails {
  courseId: Types.ObjectId;
  moduleId: Types.ObjectId;
  content_type: "lecture" | "notes" | "exam";
  contentId: Types.ObjectId;
  status: "published" | "drafted";
  deletedAt: Date | null;
  isDeleted: boolean;
}
