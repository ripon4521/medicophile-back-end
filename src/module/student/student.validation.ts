import { z } from "zod";

// 🔹 Helper Validators
const optionalNonEmptyString = z.union([z.string().min(1), z.literal("")]).optional();
const optionalPhone = z.union([
  z.string().min(10, "Phone number must be at least 10 digits."),
  z.literal(""),
]).optional();
const optionalGurdianPhone = z.union([
  z
    .string()
    .min(11, "Gurdian Phone too small. Number must be 11 characters.")
    .max(11, "Gurdian phone number must be 11 characters long"),
  z.literal(""),
]).optional();
const optionalEmail = z.union([z.string().email(), z.literal("")]).optional();
const optionalURL = z.union([z.string().url(), z.literal("")]).optional();
const optionalPassword = z.union([
  z.string().min(6, "Password must be at least 6 characters long."),
  z.literal(""),
]).optional();

// 🔹 SSC Schema
const sscSchema = z
  .object({
    schoolName: optionalNonEmptyString,
    boardName: optionalNonEmptyString,
    passingYear: optionalNonEmptyString,
    sscGpa: z.union([z.number(), z.literal(0)]).optional(),
    sscRoll: optionalNonEmptyString,
    sscRegeistration: optionalNonEmptyString,
  })
  .optional();

// 🔹 HSC Schema
const hscSchema = z
  .object({
    schoolName: optionalNonEmptyString,
    boardName: optionalNonEmptyString,
    passingYear: optionalNonEmptyString,
    hscGpa: z.union([z.number(), z.literal(0)]).optional(),
    hscRoll: optionalNonEmptyString,
    hscRegeistration: optionalNonEmptyString,
  })
  .optional();

// 🔹 Create Schema
const createStudentSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name cannot be empty."),
    email: z
      .string()
      .regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, {
        message: "Only valid Gmail addresses are allowed",
      }),
    password: z.string().min(6, "Password must be at least 6 characters long."),
  }),
});

// 🔹 Update Schema
const updateStudentSchema = z.object({
  body: z.object({
    role: z.literal("student").optional(),
    profile_picture: optionalURL,
    email: optionalEmail,
    phone: optionalPhone,
    password: optionalPassword,
    name: optionalNonEmptyString,
    gurdianName: optionalNonEmptyString,
    gurdianPhone: optionalGurdianPhone,
    address: optionalNonEmptyString,
    status: z.enum(["Active", "Blocked"]).optional(),
    ssc: sscSchema,
    hsc: hscSchema,
  }),
});

// 🔹 Export All
export const studentValidation = {
  createStudentSchema,
  updateStudentSchema,
};
