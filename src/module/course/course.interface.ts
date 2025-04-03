import { Types } from "mongoose";

export interface ICourse {
  slug: string;
  cover_photo: string;
  course_title: string;
  description: string;
  duration: string;
  preOrder: "on" | "off";
  course_type: "online" | "offline";
  category: Types.ObjectId;
  createdBy: Types.ObjectId;
  expireTime: Date;
  daySchedule: [string];
  timeShedule: [string];
  price: number;
  offerPrice: number;
  takeReview: "on" | "off";
  status: "active" | "inactive";
  course_tag: string[];
  isDeleted: true;
  deletedAt: Date | null;
}
