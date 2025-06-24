"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookCategoryValidation = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
// Optional string that can be empty string or non-empty
const optionalNonEmptyString = zod_1.z.union([zod_1.z.string().min(1), zod_1.z.literal("")]).optional();
const createBookCategoryValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Category name is required"),
        description: zod_1.z.string().optional(),
        createdBy: ObjectIdSchema,
    }),
});
const updateBookCategoryValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: optionalNonEmptyString,
        description: zod_1.z.union([zod_1.z.string(), zod_1.z.literal("")]).optional(),
    }),
});
exports.bookCategoryValidation = {
    createBookCategoryValidationSchema,
    updateBookCategoryValidationSchema,
};
