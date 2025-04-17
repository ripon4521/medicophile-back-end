export interface IChangePasswordPayload {
  phone: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
