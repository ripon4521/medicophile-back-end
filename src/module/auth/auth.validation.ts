import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    phone: z.string({
      required_error: "Phone number must be valid and 11 charchters ",
    }),
    password: z.string({ required_error: "Password is required" }),
  }),
});

const resetValidationSchema = z.object({
  body: z.object({
    phone: z.string({
      required_error: "Phone number must be valid and 11 charchters ",
    })
  }),
});




export const AuthValidation = {
  loginValidationSchema,
  resetValidationSchema
};
