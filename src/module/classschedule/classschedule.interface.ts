import { Types } from "mongoose";

export interface IClassSchedule {
  day: string;
  time: string;
  room: string;
  courseId: Types.ObjectId;
  facultyId: Types.ObjectId;
 
}
