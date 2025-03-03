import mongoose, { Schema, Document } from "mongoose";
import { IStudentUser } from "./student.interface";
import bcrypt from 'bcrypt';


const StudentUserSchema = new Schema<IStudentUser>({
  role: { type: String, enum: ["student"], required: true },
  student_id: { type: String, required: true, unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique: true,
    ref: 'User',
  },
  name: { type: String, required: true },
  gmail: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  program: { type: String, required: true },
  year_of_study: { type: Number, required: true, min: 1 },
  profile_picture: { type: String },
  semester: { type: String, required: true },
  preferences: {
    language: { type: String, required: true },
    notification_preferences: {
      email_notifications: { type: Boolean, required: true },
      sms_notifications: { type: Boolean, required: true },
      push_notifications: { type: Boolean, required: true },
    },
  },
  academic_info: {
    current_gpa: { type: Number, required: true, min: 0, max: 4 },
    major: { type: String, required: true },
    minor: { type: String },
  },
  emergency_contact: {
    name: { type: String, required: true },
    relationship: { type: String, required: true },
    contact: { type: String, required: true },
  },
  status: {
    type: String,
    enum: ['unblocked', 'blocked'],
    default: 'unblocked',
  },
});


StudentUserSchema.pre("save", async function (next) {
    const existingStudent = await mongoose.model("Students").findOne({
      $or: [{ student_id: this.student_id }, { gmail: this.gmail }],
    });
    if (existingStudent) {
      const error = new Error("Student with this ID or Gmail already exists");
      return next(error);
    }
  
    next();
  });
  


const StudentUserModel = mongoose.model<IStudentUser>("Students", StudentUserSchema);

export default StudentUserModel;
