import mongoose, { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phone: { type: String,  },
    role: {
      type: String,
      enum: ["superAdmin", "admin", "teacher", "student", "shopManager"],
    },
    profile_picture: { type: String },
    status: { type: String, enum: ["Active", "Blocked"] },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },

  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  },
);



export const UserModel = model<IUser>("User", UserSchema);
