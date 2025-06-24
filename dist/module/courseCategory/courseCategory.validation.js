"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseCategoryValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
// ObjectId Validation Schema
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
const optionalObjectId = zod_1.z.union([ObjectIdSchema, zod_1.z.literal("")]).optional();
// Optional helpers
const optionalString = (msg) => zod_1.z.union([zod_1.z.string().min(1, msg), zod_1.z.literal("")]).optional();
const optionalURL = (msg) => zod_1.z.union([zod_1.z.string().url(msg), zod_1.z.literal("")]).optional();
// Create Course Category Schema
const createCourseCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, "Title is required"),
        cover_photo: zod_1.z.string().url("Invalid cover photo URL"),
        createdBy: ObjectIdSchema,
    }),
});
// Update Course Category Schema
const updateCourseCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        title: optionalString("Title is required"),
        cover_photo: optionalURL("Invalid cover photo URL"),
        createdBy: optionalObjectId,
    }),
});
exports.courseCategoryValidation = {
    createCourseCategorySchema,
    updateCourseCategorySchema,
};
