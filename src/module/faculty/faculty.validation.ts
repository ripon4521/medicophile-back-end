import { optional, z } from "zod";


const SubjectTaughtSchema = z.object({
  class: z.number().min(6).max(12).optional(),
  subjects: z.array(z.string().min(1, "Subject name is required")).optional(),
}).optional();

export const createFacultyValidationSchema = z.object({
  body: z.object({
   
    full_name: z.string().min(1, "Full name is required"), // Required for creation
    gmail: z.string().email("Invalid email format").min(1, "Gmail is required"), // Required for creation
    password: z.string().min(6, "Password must be at least 6 characters long"), // Required for creation
    contact: z.string().min(1, "Contact is required"), // Required for creation
    gender: z.enum(["Male", "Female", "Other"]), // Required for creation
    date_of_birth: z.string().min(1, "Date of birth is required"), // Required for creation
    profile_picture: z.string().min(1, "Profile picture URL is required"), // Required for creation
    religion: z.string().min(1, "Religion is required"), // Required for creation
    address: z.string().min(1, "Address is required"),
    district: z.string().min(1, "district is required"),
    division: z.string().min(1, "division is required"),
    qualifications: z.array(z.string()).min(1, "At least one qualification is required"), // Required for creation
    experience: z.string().min(1, "Experience is required"), // Required for creation
    subjects_taught: z.array(SubjectTaughtSchema).min(1, "At least one subject taught is required").optional(), // Required for creation
    joining_date: z.string().min(1, "Joining date is required"), // Required for creation
    status: z.enum(["blocked", "unblocked"]), // Required for creation
}) 
});


export const updateFacultyValidationSchema = z.object({
  body: z.object({
   
    full_name: z.string().min(1, "Full name is required").optional(), // Required for creation
    gmail: z.string().email("Invalid email format").min(1, "Gmail is required").optional(), // Required for creation
    password: z.string().min(6, "Password must be at least 6 characters long").optional(), // Required for creation
    contact: z.string().min(1, "Contact is required").optional(), // Required for creation
    gender: z.enum(["Male", "Female", "Other"]).optional(), // Required for creation
    date_of_birth: z.string().min(1, "Date of birth is required").optional(), // Required for creation
    profile_picture: z.string().min(1, "Profile picture URL is required").optional(), // Required for creation
    religion: z.string().min(1, "Religion is required").optional(), // Required for creation
    address: z.string().min(1, "Address is required").optional(),
    district: z.string().min(1, "district is required").optional(),
    division: z.string().min(1, "division is required").optional(),
    qualifications: z.array(z.string()).min(1, "At least one qualification is required").optional(), // Required for creation
    experience: z.string().min(1, "Experience is required").optional(), // Required for creation
    subjects_taught: z.array(SubjectTaughtSchema).min(1, "At least one subject taught is required").optional(), // Required for creation
    joining_date: z.string().min(1, "Joining date is required").optional(), // Required for creation
    status: z.enum(["blocked", "unblocked"]).optional(), // Required for creation
}) 
});



export const facultysValidation = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
