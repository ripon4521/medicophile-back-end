"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.liveClassValidation = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
const createliveClassZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        courseId: ObjectIdSchema,
        createdBy: ObjectIdSchema,
        title: zod_1.z
            .string({ required_error: "Title is required" })
            .min(1, { message: "Title cannot be empty" }),
        description: zod_1.z
            .string({ required_error: "Description is required" })
            .min(1, { message: "Description cannot be empty" })
            .optional(),
        link: zod_1.z.string().url("Url must be string"),
        status: zod_1.z.enum(["Published", "Drafted"], {
            required_error: "Status is required",
            invalid_type_error: "Status must be either 'Published' or 'Drafted'",
        }),
    }),
});
const updateliveClassZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        courseId: ObjectIdSchema.optional(),
        createdBy: ObjectIdSchema.optional(),
        title: zod_1.z
            .string({ required_error: "Title is required" })
            .min(1, { message: "Title cannot be empty" })
            .optional(),
        description: zod_1.z
            .string({ required_error: "Description is required" })
            .min(1, { message: "Description cannot be empty" })
            .optional(),
        link: zod_1.z.string().url("Url must be string").optional(),
        status: zod_1.z
            .enum(["Published", "Drafted"], {
            required_error: "Status is required",
            invalid_type_error: "Status must be either 'Published' or 'Drafted'",
        })
            .optional(),
    }),
});
exports.liveClassValidation = {
    createliveClassZodSchema,
    updateliveClassZodSchema,
};
