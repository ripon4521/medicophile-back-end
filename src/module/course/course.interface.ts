import { Types } from "mongoose";

export interface ICourse {
  course_code: string;
  cover_photo:string;
  course_title: string;
  totalAdmited: number;
  duration: string;
  preOrder: "on" | "off";
  course_type: "online" | "offline";
  category: Types.ObjectId;
  price: number;
  offerPrice: number;
  takeReview: "on" | "off";
  launchingDate: string;
  status: "active" | "inactive";
  course_tag:string;
}
