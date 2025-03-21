import { Types } from "mongoose";

export interface ICourse {
    course_code: string;
    course_title: string;
    totalAdmited:number;
    duration:string;
    preOrder:"on" | "off";
    course_type: "online" | "offline";
    category:string;
    price: number;
    offerPrice: number;
    takeReview:"on"|"off";
    shedule:Types.ObjectId
    status:"active" | "unactive"
  }