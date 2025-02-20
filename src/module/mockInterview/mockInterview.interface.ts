import { Schema } from "mongoose";

interface IResponse {
    question: string;
    answer: string;
    confidence_score: number;
  }
  
export  interface IMockInterview{
    job_seeker: Schema.Types.ObjectId;
    questions: string[];
    responses: IResponse[];
    feedback: string;
    createdAt: Date;
  }