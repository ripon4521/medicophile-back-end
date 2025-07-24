import mongoose, { Schema, Types } from "mongoose";
import { IStudent } from "./student.interface";

// Optional nested SSC schema
const sscSchema = new Schema(
  {
    schoolName: { type: String, default: "" },
    boardName: { type: String, default: "" },
    passingYear: { type: String, default: "" },
    sscGpa: { type: Number, default: 0 },
    sscRoll: { type: String, default: "" },
    sscRegeistration: { type: String, default: "" },
  },
  { _id: false }
);

// Optional nested HSC schema
const hscSchema = new Schema(
  {
    schoolName: { type: String, default: "" },
    boardName: { type: String, default: "" },
    passingYear: { type: String, default: "" },
    hscGpa: { type: Number, default: 0 },
    hscRoll: { type: String, default: "" },
    hscRegeistration: { type: String, default: "" },
  },
  { _id: false }
);

const studentSchema = new Schema<IStudent>(
  {
    role: {
      type: String,
      enum: ["superAdmin", "admin", "teacher", "student", "shopManager"],
      default: "student",
    },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    phone: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gurdianName: { type: String, default: "" },
    gurdianPhone: { type: String, default: "" },
    profile_picture: { type: String, default: "" },
    address: { type: String, default: "" },
    status: { type: String, enum: ["Active", "Blocked"], default: "Active" },
    deletedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },

    // SSC & HSC optional
    ssc: { type: sscSchema, default: {} },
    hsc: { type: hscSchema, default: {} },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  }
);

// Middleware: isDeleted=true হলে deletedAt BD Time সেট করো
studentSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as Record<string, any>;
  if (update?.isDeleted === true) {
    update.deletedAt = new Date(new Date().getTime() + 6 * 60 * 60 * 1000); // BD Time (UTC+6)
  }
  next();
});

const studentModel = mongoose.model("Students", studentSchema);
export default studentModel;
