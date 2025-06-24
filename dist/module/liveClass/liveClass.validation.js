"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.liveClassValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
// Helper: Accepts either a non-empty string or an empty string (for optional fields)
const optionalNonEmptyString = zod_1.z.union([zod_1.z.string().min(1), zod_1.z.literal("")]).optional();
const optionalURL = zod_1.z.union([zod_1.z.string().url({ message: "Link must be a valid URL" }), zod_1.z.literal("")]).optional();
const createliveClassZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        courseId: ObjectIdSchema,
        createdBy: ObjectIdSchema,
        title: zod_1.z.string({ required_error: "Title is required" }).min(1, { message: "Title cannot be empty" }),
        description: optionalNonEmptyString,
        link: zod_1.z.string().url({ message: "Link must be a valid URL" }),
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
        title: optionalNonEmptyString,
        description: optionalNonEmptyString,
        link: optionalURL,
        status: zod_1.z.enum(["Published", "Drafted"], {
            invalid_type_error: "Status must be either 'Published' or 'Drafted'",
        }).optional(),
    }),
});
exports.liveClassValidation = {
    createliveClassZodSchema,
    updateliveClassZodSchema,
};
