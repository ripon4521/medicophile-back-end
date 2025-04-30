import { Types } from "mongoose";

export interface IFAQ {
  question: string;
  answer: string[];
}

export interface ICourseDetails {
  isCourseExist: string[];
  syllabus: IFAQ[];
  courseDetails: IFAQ[];
  instructors: Types.ObjectId[]; 
}
