import mongoose, { Schema, Types } from "mongoose";

const facultySchema = new Schema(
  {
    role: {
      type: String,
      enum: ["superAdmin", "admin", "teacher"],
      required: true,
    },
    userId: { type: Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_picture: { type: String },
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

// ✅ Middleware: Delete হলে `deletedAt` BD Time অনুযায়ী সেট হবে
// facultySchema.pre("findOneAndUpdate", function (next) {
//   const update = this.getUpdate() as Record<string, any>;

//   if (update?.isDeleted === true) {
//     update.deletedAt = new Date(new Date().getTime() + 6 * 60 * 60 * 1000); // ✅ BD Time (UTC+6)
//   }

//   next();
// });

const Faculty = mongoose.model("Faculty", facultySchema);
export default Faculty;
