export interface IAnalytics {
    id: string;
    event: 'job_posted' | 'application_submitted';
    user: string; // Reference to User ID
    data: Record<string, any>; // Additional details
    createdAt: Date;
  }