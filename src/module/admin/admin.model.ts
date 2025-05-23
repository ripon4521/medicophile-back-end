import mongoose, { Schema, Types } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config";
import { IAdmin } from "./admin.interface";

const adminSchema = new Schema<IAdmin>(
  {
    role: {
      type: String,
      enum: ["superAdmin", "admin", "teacher", "student", "shop manager"],
      default: "admin",
    },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, default: "" },
    password: { type: String, default: "" },
    profile_picture: { type: String, default: "" },
    status: { type: String, enum: ["Active", "Blocked"], default: "Active" },
    deletedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  },
);

// ✅ Middleware: Delete হলে `deletedAt` BD Time অনুযায়ী সেট হবে
adminSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as Record<string, any>;

  if (update?.isDeleted === true) {
    update.deletedAt = new Date(new Date().getTime() + 6 * 60 * 60 * 1000); // ✅ BD Time (UTC+6)
  }

  next();
});

const adminModel = mongoose.model("Admin", adminSchema);
export default adminModel;
