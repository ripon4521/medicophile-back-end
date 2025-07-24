import { z } from "zod";
import { Types } from "mongoose";

const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

const optionalNonEmptyString = z.union([z.string().min(1), z.literal("")]).optional();
const optionalName = z.union([
  z.string().min(3, "Name must be at least 3 characters"),
  z.literal(""),
]).optional();
const optionalPhone = z.union([
  z
    .string()
    .regex(/^\+?(88)?01[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),
  z.literal(""),
]).optional();
const optionalEmail = z.union([z.string().email("Invalid email format"), z.literal("")]).optional();
const optionalPassword = z.union([
  z.string().min(6, "Password must be at least 6 characters"),
  z.literal(""),
]).optional();
const optionalURL = z.union([z.string().url("Invalid URL format"), z.literal("")]).optional();


const educationSchema = z.object({
  hscName: z.string().min(1, "HSC institution name is required"),
  hscPassingYear: z.string().min(1, "HSC passing year is required"),
  mbbsName: z.string().min(1, "MBBS institution name is required"),
  session: z.string().min(1, "Session is required"),
});


const createFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z
      .string()
      .regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, {
        message: "Only valid Gmail addresses are allowed",
      }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: optionalPhone,
    address: optionalNonEmptyString,
    profile_picture: optionalURL,
    gender: z.enum(["Male", "Female"]).optional(),
    department: optionalNonEmptyString,
    demoClassLink: z.array(z.string().url("Invalid URL")).optional(),
    exprienced: z.coerce.number().optional(),
    education: educationSchema.optional(), 
  }),
});


const updateFacultyValidationSchema = z.object({
  body: z.object({
    role: z.enum(["superAdmin", "admin", "teacher", "student", "shopManager"]).optional(),
    name: optionalName,
    email: optionalEmail,
    password: optionalPassword,
    phone: optionalPhone,
    address: optionalNonEmptyString,
    profile_picture: optionalURL,
    gender: z.enum(["Male", "Female"]).optional(),
    department: optionalNonEmptyString,
    demoClassLink: z.array(z.string().url("Invalid URL")).optional(),
    exprienced: z.coerce.number().optional(),
    status: z.enum(["Active", "Blocked"]).optional(),
    isDeleted: z.boolean().optional(),

    education: educationSchema.partial().optional(), 
  }),
});

export const facultyValidation = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
