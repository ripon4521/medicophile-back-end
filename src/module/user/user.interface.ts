
export interface IUser{
  _id?: string;
  name: string;
  email: string;
  password: string;
  contact: string;
  address: string;
  role: 'admin' | 'student' | 'faculty' | 'guest' | 'canteen_staff';
  profile_picture?: string;
  date_of_birth?: Date;
  registration_date: Date;
  last_login?: Date;
}
