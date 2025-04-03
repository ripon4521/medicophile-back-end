import mongoose, {  Schema, Types } from "mongoose";
import { IStudent } from "./student.interface";

const stundetSchema = new Schema<IStudent>(
  {
    role: 'student',
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_picture: { type: String},
    status: { type: String, enum: ["Active", "Blocked"], default: "Active" },
    deletedAt: { type: Date, default: null },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, // ✅ BD Time (UTC+6)
  },
);



const Faculty = mongoose.model("Students", stundetSchema);
export default Faculty;
