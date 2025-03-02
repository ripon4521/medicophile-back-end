export interface INotification {
  user: string; // User ID
  message: string;
  type: "email" | "sms" | "push";
  sent_at: Date;
  status: "sent" | "failed" | "pending";
}