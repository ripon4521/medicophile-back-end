"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
const createProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, "Title is required"),
        description: zod_1.z.string().optional(),
        trailer: zod_1.z.string().url("Invalid URL").optional(),
        categoryId: ObjectIdSchema,
        status: zod_1.z.enum(["Active", "Drafted"]),
        price: zod_1.z.number().min(0, "Price must be a positive number"),
        offerPrice: zod_1.z.number().min(0, "Offer price must be a positive number").optional(),
        stock: zod_1.z.enum(["In Stock", "Out Off Stock"]),
        coverPhoto: zod_1.z.string().url("Invalid cover photo URL"),
        createdBy: ObjectIdSchema,
        tags: zod_1.z.array(zod_1.z.string())
    })
});
const updateProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, "Title is required").optional(),
        description: zod_1.z.string().optional(),
        trailer: zod_1.z.string().url("Invalid URL").optional(),
        categoryId: ObjectIdSchema.optional(),
        status: zod_1.z.enum(["Active", "Drafted"]).optional(),
        price: zod_1.z.number().min(0, "Price must be a positive number").optional(),
        offerPrice: zod_1.z.number().min(0, "Offer price must be a positive number").optional(),
        stock: zod_1.z.enum(["In Stock", "Out Off Stock"]).optional(),
        coverPhoto: zod_1.z.string().url("Invalid cover photo URL").optional(),
        createdBy: ObjectIdSchema.optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional()
    })
});
exports.productValidation = {
    createProductSchema,
    updateProductSchema
};
