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
        noteTitle: zod_1.z.string().min(1, "Note title is required"),
        description: zod_1.z.string().min(1, "Description is required").optional(),
        createdBy: ObjectIdSchema,
        courseId: ObjectIdSchema,
        noteFile: zod_1.z.string().url("Invalid file URL"),
        classTime: zod_1.z.string().datetime("Invalid date format"),
        launchingDate: zod_1.z.string().datetime("Invalid date format"),
        status: zod_1.z.enum(["published", "drafted"]),
    }),
});
const updateNotesSchema = zod_1.z.object({
    body: zod_1.z.object({
        noteTitle: zod_1.z.string().min(1, "Note title is required").optional(),
        description: zod_1.z.string().min(1, "Description is required").optional(),
        noteFile: zod_1.z.string().url("Invalid file URL").optional(),
        classTime: zod_1.z.string().datetime("Invalid date format").optional(),
        launchingDate: zod_1.z.string().datetime("Invalid date format").optional(),
        status: zod_1.z.enum(["published", "drafted"]).optional(),
    }),
});
exports.noteValidation = {
    createNotesSchema,
    updateNotesSchema,
};
