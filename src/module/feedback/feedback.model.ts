import { Schema, model } from "mongoose";
import { TFeedback } from "./feedback.interface";

// Define Feedback Schema
const feedbackSchema = new Schema<TFeedback>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User collection
    rating: { type: Number, required: true, min: 1, max: 5 }, // Rating between 1-5
    comment: { type: String }, // Optional comment
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

// Create Feedback Model
export const feedbackModel = model<TFeedback>("Feedback", feedbackSchema);
