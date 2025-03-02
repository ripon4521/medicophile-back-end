import { Schema, model, Document } from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: [],
    required: true 
  },
  contact: { type: String, required: true },
  profile_picture: String,
  registration_date: { type: Date, default: Date.now }
});

export const User = model<IUser>('User', userSchema);