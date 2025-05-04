import { Types } from "mongoose";

export interface IFAQ {
  question: string;
  answer: string[];
}

export interface ICourseDetails {
  courseId: Types.ObjectId;
  isCourseExist: string[];
  syllabus: IFAQ[];
  courseDetails: IFAQ[];
  instructors: Types.ObjectId[];
  isDeleted: boolean;
  deletedAt: Date;
}
