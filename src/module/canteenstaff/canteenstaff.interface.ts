import { IUser } from "../user/user.interface";

export interface ICanteenStaffUser extends IUser {
    role: 'canteen_staff';
    staff_id: string;
    canteen_section: string;
    shift_timing: string;
  }
  