"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
const createNotesSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, "Title is required"),
        description: zod_1.z.string().min(1, "Description is required"),
        createdBy: ObjectIdSchema,
        moduleId: ObjectIdSchema,
        courseId: ObjectIdSchema,
        noteFile: zod_1.z.string().optional(),
        status: zod_1.z.enum(["Published", "Drafted"]),
    }),
});
const updateNotesSchema = zod_1.z.object({
    body: zod_1.z.object({
        createdBy: ObjectIdSchema.optional(),
        moduleId: ObjectIdSchema.optional(),
        courseId: ObjectIdSchema.optional(),
        title: zod_1.z.string().min(1, "Title is required").optional(),
        description: zod_1.z.string().min(1, "Description is required").optional(),
        noteFile: zod_1.z.string().optional(),
        status: zod_1.z.enum(["published", "drafted"]).optional(),
    }),
});
exports.noteValidation = {
    createNotesSchema,
    updateNotesSchema,
};
