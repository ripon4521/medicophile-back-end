"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const ObjectIdSchema = zod_1.z
    .string()
    .refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
// Helpers for optional fields that allow empty string
const optionalNonEmptyString = zod_1.z.union([zod_1.z.string().min(1), zod_1.z.literal("")]).optional();
const optionalNonEmptyupload = zod_1.z.union([zod_1.z.string().min(1), zod_1.z.literal("")]).optional().nullable();
const optionalNonEmptyPreview = zod_1.z.union([zod_1.z.string().min(1), zod_1.z.literal("")]).optional().nullable();
const optionalURL = zod_1.z.union([zod_1.z.string().url("Invalid URL"), zod_1.z.literal("")]).optional();
const createProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, "Title is required"),
        description: optionalNonEmptyString,
        pdf: optionalNonEmptyString,
        uploadLink: optionalNonEmptyupload,
        previewPdf: optionalNonEmptyupload,
        trailer: optionalURL,
        categoryId: ObjectIdSchema,
        status: zod_1.z.enum(["Active", "Drafted"]),
        bookType: zod_1.z.enum(["Hard copy", "Ebook"]),
        price: zod_1.z.number().min(0, "Price must be a positive number"),
        offerPrice: zod_1.z.number().min(0, "Offer price must be a positive number").optional(),
        stock: zod_1.z.enum(["In Stock", "Out Off Stock"]),
        coverPhoto: zod_1.z.string().url("Invalid cover photo URL"),
        createdBy: ObjectIdSchema,
        tags: zod_1.z.array(zod_1.z.string()),
    }),
});
const updateProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: optionalNonEmptyString,
        description: optionalNonEmptyString,
        pdf: optionalNonEmptyString,
        uploadLink: optionalNonEmptyupload,
        previewPdf: optionalNonEmptyPreview,
        trailer: optionalURL,
        categoryId: ObjectIdSchema.optional(),
        status: zod_1.z.enum(["Active", "Drafted"]).optional(),
        bookType: zod_1.z.enum(["Hard copy", "Ebook"]).optional(),
        price: zod_1.z.number().min(0, "Price must be a positive number").optional(),
        offerPrice: zod_1.z.number().min(0, "Offer price must be a positive number").optional(),
        stock: zod_1.z.enum(["In Stock", "Out Off Stock"]).optional(),
        coverPhoto: optionalURL,
        createdBy: ObjectIdSchema.optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
exports.productValidation = {
    createProductSchema,
    updateProductSchema,
};
