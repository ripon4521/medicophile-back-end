"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleDetailsValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const ObjectId = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
const createIModuleDetailsSchema = zod_1.z.object({
    body: zod_1.z.object({
        courseId: ObjectId,
        moduleId: ObjectId,
        content_type: zod_1.z.enum(["lecture", "notes", "exam"]),
        contentId: ObjectId,
        status: zod_1.z.enum(["published", "drafted"]),
        deletedAt: zod_1.z.date().nullable(),
        isDeleted: zod_1.z.boolean(),
    }),
});
const updateIModuleDetailsSchema = zod_1.z.object({
    body: zod_1.z.object({
        courseId: ObjectId.optional(),
        moduleId: ObjectId.optional(),
        content_type: zod_1.z.enum(["lecture", "notes", "exam"]).optional(),
        contentId: ObjectId.optional(),
        status: zod_1.z.enum(["published", "drafted"]).optional(),
        deletedAt: zod_1.z.date().nullable().optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.moduleDetailsValidation = {
    createIModuleDetailsSchema,
    updateIModuleDetailsSchema,
};
