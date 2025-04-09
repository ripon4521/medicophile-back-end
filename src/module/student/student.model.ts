import mongoose, { Schema, Types } from "mongoose";
import { IStudent } from "./student.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const stundetSchema = new Schema<IStudent>(
  {
    role: {
      type: String,
      enum: ["superAdmin", "admin", "teacher", "student"],
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gurdianName: { type: String },
    gurdianPhone: { type: String },
    profile_picture: { type: String },
    address: { type: String, required: true },
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
stundetSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as Record<string, any>;

  if (update?.isDeleted === true) {
    update.deletedAt = new Date(new Date().getTime() + 6 * 60 * 60 * 1000); // ✅ BD Time (UTC+6)
  }

  next();
});

stundetSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

stundetSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

const studentModel = mongoose.model("Students", stundetSchema);
export default studentModel;
