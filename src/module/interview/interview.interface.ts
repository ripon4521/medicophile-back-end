import { Schema } from "mongoose";

export interface IInterview  {
    application: Schema.Types.ObjectId;
    scheduledAt: Date;
    interview_type: "video" | "in-person";
    feedback?: string;
    status: "completed" | "pending";
  }