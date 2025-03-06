import mongoose, { Schema } from "mongoose";
import { IFacultyUser } from "./faculty.interface";

const FacultyUserSchema = new Schema<IFacultyUser>({
    role: {
        type: String,
        enum: ['faculty'],
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    gmail: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    profile_picture: {
        type: String,
    },
    status: {
        type: String,
        enum: ["unblocked", "blocked"],
        default: "unblocked",
    },
    faculty_id: {
        type: String,
        required: true,
        unique: true,
    },
    department: {
        type: String,
        required: true,
    },
    office_location: {
        type: String,
        required: true,
    },
    courses_taught: {
        type: [String],
        default: [],
    }
});


FacultyUserSchema.pre("save", async function (next) {
    const existingStudent = await mongoose.model("Facultys").findOne({
      $or: [{ faculty_id: this.faculty_id }, { gmail: this.gmail }],
    });
    if (existingStudent) {
      const error = new Error("Student with this ID or Gmail already exists");
      return next(error);
    }
    next();
  });
  


const FacultyUserModel = mongoose.model<IFacultyUser>("Facultys", FacultyUserSchema);

export default FacultyUserModel;
