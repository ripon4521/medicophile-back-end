import { Types } from "mongoose";

export interface ICourse {
  slug: string;
  prefix?:string;
  cover_photo: string;
  course_title: string;
  description: string;
  duration: string;
  preOrder: "on" | "off";
  course_type: "online" | "offline";
  category: Types.ObjectId;
  createdBy: Types.ObjectId;
  expireTime: string;
  daySchedule: [string];
  timeShedule: [string];
  price: number;
  offerPrice: number;
  takeReview: "on" | "off";
  status: "active" | "inactive";
  course_tag: string[];
  access?: boolean;
  isDeleted: boolean;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
