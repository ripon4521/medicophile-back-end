"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogCategoryValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
// Helper to validate MongoDB ObjectId
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
// Helper: Accepts either a non-empty string or an empty string
const optionalNonEmptyString = zod_1.z.union([zod_1.z.string().min(1), zod_1.z.literal("")]).optional();
const createBlogCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({ required_error: "Title is required" })
            .min(1, "Title is required"),
        createdBy: ObjectIdSchema,
    }),
});
const updateBlogCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        title: optionalNonEmptyString,
    }),
});
exports.blogCategoryValidation = {
    createBlogCategorySchema,
    updateBlogCategorySchema,
};
