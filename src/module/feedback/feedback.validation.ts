import { z } from "zod";

// Feedback Zod Schema
 const createFeedback = z.object({
  id: z.string().min(1, { message: "ID is required" }), // Simple string validation (can be ObjectId/UUID)
  user: z.string().min(1, { message: "User ID is required" }), // Reference to User ID
  rating: z.number()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating cannot exceed 5" }), // 1 to 5 rating
  comment: z.string().optional(), // Optional comment
 
});


const feedbackValidation = {
    createFeedback,
}
