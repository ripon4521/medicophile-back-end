"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryvalidation = void 0;
const zod_1 = require("zod");
const createCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        description: zod_1.z.string().optional(),
    }),
});
const updateCategoryValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required").optional(),
        description: zod_1.z.string().optional(),
    }),
});
exports.categoryvalidation = {
    createCategorySchema,
    updateCategoryValidationSchema,
};
