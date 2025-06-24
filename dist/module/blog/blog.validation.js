"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidation = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
// ObjectId validation
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
// Helpers
const optionalNonEmptyString = zod_1.z.union([zod_1.z.string().min(1), zod_1.z.literal("")]).optional();
const optionalURL = zod_1.z.union([zod_1.z.string().url(), zod_1.z.literal("")]).optional();
const optionalTags = zod_1.z.union([
    zod_1.z.array(zod_1.z.string({ required_error: "Tags must be strings" })).min(1, {
        message: "At least one tag is required",
    }),
    zod_1.z.literal(""),
]).optional();
const createBlogZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({ required_error: "Title is required" })
            .min(1, { message: "Title cannot be empty" }),
        description: zod_1.z
            .string({ required_error: "Description is required" })
            .min(1, { message: "Description cannot be empty" }),
        categoryId: ObjectIdSchema,
        createdBy: ObjectIdSchema,
        tags: optionalTags,
        status: zod_1.z.enum(["Published", "Drafted"], {
            required_error: "Status is required",
            invalid_type_error: "Status must be either 'Published' or 'Drafted'",
        }),
        coverPhoto: optionalURL,
    }),
});
const updateBlogZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: optionalNonEmptyString,
        description: optionalNonEmptyString,
        categoryId: ObjectIdSchema.optional(),
        createdBy: ObjectIdSchema.optional(),
        tags: optionalTags,
        status: zod_1.z
            .enum(["Published", "Drafted"], {
            required_error: "Status is required",
            invalid_type_error: "Status must be either 'Published' or 'Drafted'",
        })
            .optional(),
        coverPhoto: optionalURL,
    }),
});
exports.blogValidation = {
    createBlogZodSchema,
    updateBlogZodSchema,
};
