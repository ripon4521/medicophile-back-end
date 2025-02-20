export interface IFeedback {
    id: string;
    user: string; // Reference to User ID
    rating: number; // e.g., 1 to 5
    comment?: string;
    createdAt: Date;
  }