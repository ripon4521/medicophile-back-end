import { Types } from "mongoose";
interface IDay {
  day: string;
  time: string;
  _id?: Types.ObjectId;
}

export interface IClassSchedule {
  day: IDay[];
  courseId: Types.ObjectId;
  facultyId: Types.ObjectId;
}
