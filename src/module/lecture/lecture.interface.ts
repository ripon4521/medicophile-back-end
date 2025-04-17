import { Types } from "mongoose";

export interface ILeecture {
  slug: string;
  courseId: Types.ObjectId;
  createdBy: Types.ObjectId;
  moduleId: Types.ObjectId;
  title: string;
  server: "Youtube" | "Vimeo" | "Bunny" | "Others";
  videoId: string;
  duration: number;
  isFree: boolean;
  status: "Published" | "Drafted";
  tags: string[];
  scheduleDate:Date;
  deletedAt: Date;
  isDeleted: boolean;
}
