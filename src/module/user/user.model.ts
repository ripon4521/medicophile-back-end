import mongoose, { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String },
    password: { type: String },
    // studentId:{ type: mongoose.Schema.ObjectId},
    // teacherId: {type:mongoose.Schema.ObjectId},
    phone: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["superAdmin", "admin", "teacher", "student"],
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

// UserSchema.pre("save", async function (next) {
//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this;
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds),
//   );
//   next();
// });

// UserSchema.post("save", async function (doc, next) {
//   doc.password = "";
//   next();
// });

export const UserModel = model<IUser>("User", UserSchema);
