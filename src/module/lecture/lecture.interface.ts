import { Types } from "mongoose";

export type IDuraction = {
  hour: number;
  minute: number;
  second: number;
};

export interface ILeecture {
  courseId: Types.ObjectId;
  createdBy: Types.ObjectId;
  lectureTitle: string;
  description?: string;
  serveer: string;
  videoLink: string;
  duration: IDuraction;
  isFree: "yes" | "no";
  status: "published" | "drafted";
  sheduleDate: string;
}
