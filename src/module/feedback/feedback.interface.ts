import {  Types } from "mongoose";

export interface TFeedback {
    id: string;
    user: Types.ObjectId; // Reference to User ID
    rating: number; // e.g., 1 to 5
    comment?: string;
  }

