import { z } from "zod";
import { Types } from "mongoose";

export const createstudentValidationSchema = z.object({
  body: z.object({
    profile_picture: z.string().url().optional(),
    gmail: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    full_name: z.string().min(1, "Full name is required"),
    gender: z.enum(["Male", "Female", "Other"]),
    date_of_birth: z.string().min(1, "Date of birth is required"),
    section: z.string().min(1, "Section is required"),
    roll_number: z.number().int().positive("Roll number must be a positive integer").optional(),
    blood_group: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]).optional(),
    religion: z.string().min(1, "Religion is required"),
    nationality: z.string().min(1, "Nationality is required"),

    contact_info: z.object({
      guardian_name: z.string().min(1, "Guardian name is required"),
      guardian_phone: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid contact number"),
      guardian_email: z.string().email().optional(),
      student_phone: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid student phone number").optional(),
      home_address: z.string().min(1, "Home address is required"),
      district: z.string().min(1, "District is required"),
      division: z.string().min(1, "Division is required"),
    }),

    academic_info: z.object({
      previous_school: z.string().optional(),
      admission_date: z.string().min(1, "Admission date is required").optional(),
      student_type: z.enum(["Regular", "Transferred"]),
      subjects_taken: z.array(z.string()).min(1, "At least one subject must be taken"),
      total_gpa: z.number().min(0, "GPA cannot be negative").max(5, "GPA cannot exceed 5.0").optional(),
      class_rank: z.number().int().positive("Class rank must be a positive integer").optional(),
      attendance_percentage: z.number().min(0).max(100, "Attendance percentage must be between 0-100").optional(),
      extracurricular_activities: z.array(z.string()).optional(),
    }),

    status: z.enum(["unblocked", "blocked"]),
  }),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    role: z.literal("student").optional(),
    userId: z.instanceof(Types.ObjectId, { message: "Invalid user ID" }).optional(),
    profile_picture: z.string().url().optional(),
    gmail: z.string().email().optional(),
    password: z.string().min(6, "Password must be at least 6 characters long").optional(),
    full_name: z.string().min(1, "Full name is required").optional(),
    gender: z.enum(["Male", "Female", "Other"]).optional(),
    date_of_birth: z.string().min(1, "Date of birth is required").optional(),
    section: z.string().min(1, "Section is required").optional(),
    roll_number: z.number().int().positive("Roll number must be a positive integer").optional(),
    blood_group: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]).optional(),
    religion: z.string().min(1, "Religion is required").optional(),
    nationality: z.string().min(1, "Nationality is required").optional(),

    contact_info: z.object({
      guardian_name: z.string().min(1, "Guardian name is required").optional(),
      guardian_phone: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid contact number").optional(),
      guardian_email: z.string().email().optional(),
      student_phone: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid student phone number").optional(),
      home_address: z.string().min(1, "Home address is required").optional(),
      district: z.string().min(1, "District is required").optional(),
      division: z.string().min(1, "Division is required").optional(),
    }).optional(), // Makes all fields optional inside contact_info

    academic_info: z.object({
      previous_school: z.string().optional(),
      admission_date: z.string().min(1, "Admission date is required").optional(),
      student_type: z.enum(["Regular", "Transferred"]).optional(),
      subjects_taken: z.array(z.string()).min(1, "At least one subject must be taken").optional(),
      total_gpa: z.number().min(0, "GPA cannot be negative").max(5, "GPA cannot exceed 5.0").optional(),
      class_rank: z.number().int().positive("Class rank must be a positive integer").optional(),
      attendance_percentage: z.number().min(0).max(100, "Attendance percentage must be between 0-100").optional(),
      extracurricular_activities: z.array(z.string()).optional(),
    }).optional(), // Makes all fields optional inside academic_info

    status: z.enum(["unblocked", "blocked"]).optional(),
  }),
});

export const studentValidationSchema ={
  createstudentValidationSchema,
  updateStudentValidationSchema
} ;
