import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
     email: z
      .string()
      .regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, {
        message: "Only valid Gmail addresses are allowed",
      }),
    password: z.string({ required_error: "Password is required" }),
  }),
});
const resetValidationSchema = z.object({
  body: z.object({
    phone: z
      .string({
        required_error: "Phone number is required",
      })
      .length(11, { message: "Phone number must be exactly 11 characters" })
      .regex(/^01[0-9]{9}$/, {
        message: "Phone number must be a valid Bangladeshi number",
      }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  resetValidationSchema,
};
