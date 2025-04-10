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
exports.AuthValidation = {
    loginValidationSchema,
};
