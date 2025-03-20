import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config";
import { IStudent } from "./student.interface";

const StudentSchema = new Schema<IStudent>(
  {
    role: { type: String, default:"student"},
    userId: { type: Schema.Types.ObjectId,
      ref: "User",
      required: true, },
    profile_picture:{type:String},
    gmail: { type: String, required: true, unique: true },
    password: { type: String, require: true },
    full_name: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    date_of_birth: { type: String, required: true },
    section: { type: String, required: true },
    roll_number: { type: Number, required: true },
    blood_group: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
      required: false,
    },
    religion: { type: String, required: true },
    nationality: { type: String, required: true },

    contact_info: {
      guardian_name: { type: String, required: true },
      guardian_phone: { type: String, required: true },
      guardian_email: { type: String },
      student_phone: { type: String },
      home_address: { type: String, required: true },
      district: { type: String, required: true },
      division: { type: String, required: true },
    },

    academic_info: {
      previous_school: { type: String },
      admission_date: { type: String, required: true },
      student_type: {
        type: String,
        enum: ["Regular", "Transferred"],
        required: true,
      },
      subjects_taken: { type: [String], required: true },
      total_gpa: { type: Number, required: true, min: 0, max: 5 },
      class_rank: { type: Number, required: true, min: 1 },
      attendance_percentage: { type: Number, required: true, min: 0, max: 100 },
      extracurricular_activities: { type: [String], default: [] },
    },

    status: {
      type: String,
      enum: ["unblocked", "blocked"],
      default: "unblocked",
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Prevent duplicate emails
StudentSchema.pre("save", async function (next) {
  const existingStudent = await mongoose
    .model("Students")
    .findOne({ gmail: this.gmail });
  if (existingStudent) {
    const error = new Error("A student with this Gmail already exists");
    return next(error);
  }
  next();
});

// ✅ Hash password before saving
StudentSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

const StudentModel = mongoose.model<IStudent>("Students", StudentSchema);

export default StudentModel;
