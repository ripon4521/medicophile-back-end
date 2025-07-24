import mongoose, { Schema, Types } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config";


const educationSchema = new Schema(
  {
    hscName: { type: String, required: true },
    hscPassingYear: { type: String, required: true },
    mbbsName: { type: String, required: true },
    session: { type: String, required: true },
  },
  { _id: false } 
);

const facultySchema = new Schema(
  {
    role: {
      type: String,
      enum: ["superAdmin", "admin", "teacher", "student", "shopManager"],
      default: "teacher",
    },
    userId: { type: Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String , default:''},
    address: { type: String, default: "" },
    password: { type: String, required: true },
    profile_picture: { type: String, default: "" },
    education:educationSchema,
    gender: {
      type: String,
      enum: ["Male", "Female"],
      default: "Male",
    },
    department: { type: String, default: "" },
    demoClassLink: [{ type: String, default: [] }],
    exprienced: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["Active", "Blocked"],
      default: "Active",
    },
    deletedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  }
);

// Soft delete handle
facultySchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as Record<string, any>;
  if (update?.isDeleted === true) {
    update.deletedAt = new Date(new Date().getTime() + 6 * 60 * 60 * 1000);
  }
  next();
});

// Password hash before save
facultySchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(Number(config.bcrypt_salt_rounds || 12));
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const FacultyUserModel = mongoose.model("Faculty", facultySchema);
export default FacultyUserModel;
