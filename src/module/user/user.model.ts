import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";


const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  gmail: { type: String, required: true, unique: true, },
  password: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, enum: ["admin", "student", "faculty", "guest", "canteen_staff"], required: true },
  profile_picture: { type: String },
  registration_date: { type: Date, default: Date.now },
  last_login: { type: Date },
  status: { type: String, enum: ["unblocked", "blocked"], required: true }
});

// Pre-save hook to update last_login when user logs in
UserSchema.pre("save", function (next) {
  if (this.isModified("password") || this.isNew) {
    this.last_login = new Date();
  }
  next();
});

UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

UserSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});


export const UserModel = model<IUser>('User', UserSchema);
