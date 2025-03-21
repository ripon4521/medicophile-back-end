import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import { IFaculty } from "./faculty.interface";


const FacultyUserSchema = new Schema<IFaculty>(
    {
        role: {
          type: String,
          default:"faculty"
    
          
        },
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        full_name: {
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
        gender: {
          type: String,
          enum: ["Male", "Female", "Other"],
          required: true,
        },
        date_of_birth: {
          type: String,
          required: true,
        },
        profile_picture: {
          type: String,
        },
        religion: {
          type: String,
          required: true,
        },
        address: {
         type:String, required:true
      
        },
        division: { type: String, required: true },
        district: { type: String, required: true },
        qualifications: {
          type: [String],
          required: true,
        },
        experience: {
          type: String,
          required: true,
        },
        subjects_taught: [
          {
            class: { type: Number, required: true },
            subjects: { type: [String], required: true },
          },
        ],
        joining_date: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ["blocked", "unblocked"],
          default: "unblocked",
        },
      },
      { timestamps: true }
);

/**
 * 🔹 Before saving, check if faculty_id or gmail already exists.
 */
FacultyUserSchema.pre("save", async function (next) {
  const existingFaculty = await FacultyUserModel.findOne({
   gmail: this.gmail 
  });

  if (existingFaculty) {
    const error = new Error("Faculty with this ID or Gmail already exists");
    return next(error);
  }

  // Hash password before saving
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});

/**
 * 🔹 Method to compare passwords
 */
FacultyUserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const FacultyUserModel = mongoose.model<IFaculty>(
  "Faculty",
  FacultyUserSchema
);

export default FacultyUserModel;
