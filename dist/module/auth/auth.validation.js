"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
  body: zod_1.z.object({
    phone: zod_1.z.string({
      required_error: "Phone number must be valid and 11 charchters ",
    }),
    password: zod_1.z.string({ required_error: "Password is required" }),
  }),
});
const resetValidationSchema = zod_1.z.object({
  body: zod_1.z.object({
    phone: zod_1.z
      .string({
        required_error: "Phone number is required",
      })
      .length(11, { message: "Phone number must be exactly 11 characters" })
      .regex(/^01[0-9]{9}$/, {
        message: "Phone number must be a valid Bangladeshi number",
      }),
  }),
});
exports.AuthValidation = {
  loginValidationSchema,
  resetValidationSchema,
};
