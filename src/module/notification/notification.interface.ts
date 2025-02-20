export interface INotification {
    id: string;
    user: string; // Reference to User ID
    message: string;
    type: 'job_match' | 'interview_reminder';
    read: boolean;
    createdAt: Date;
  }