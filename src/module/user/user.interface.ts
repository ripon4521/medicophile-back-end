export interface IUser {
  name: string;
  gmail: string;
  password: string;
  contact: string;
  address: string;
  role: 'admin' | 'student' | 'faculty' | 'guest' | 'canteen_staff';
  profile_picture?: string;
  registration_date: Date;
  last_login?: Date;
  status: "unblocked" | "blocked";
}
