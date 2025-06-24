"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
// Optional non-empty string or empty string for optional text fields
const optionalNonEmptyString = zod_1.z.union([zod_1.z.string().min(1), zod_1.z.literal("")]).optional();
const dateSchema = zod_1.z
    .preprocess((val) => {
    if (typeof val === "string" || val instanceof Date)
        return new Date(val);
    return val;
}, zod_1.z.date({ invalid_type_error: "Invalid date format" })).optional();
const createNotesSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, "Title is required"),
        description: optionalNonEmptyString,
        createdBy: ObjectIdSchema,
        moduleId: ObjectIdSchema,
        courseId: ObjectIdSchema,
        noteFile: optionalNonEmptyString,
        status: zod_1.z.enum(["Published", "Drafted"], {
            required_error: "Status is required",
        }),
        scheduleDate: dateSchema,
    }),
});
const updateNotesSchema = zod_1.z.object({
    body: zod_1.z.object({
        createdBy: ObjectIdSchema.optional(),
        moduleId: ObjectIdSchema.optional(),
        courseId: ObjectIdSchema.optional(),
        title: optionalNonEmptyString,
        description: optionalNonEmptyString,
        noteFile: optionalNonEmptyString,
        status: zod_1.z.enum(["Published", "Drafted"]).optional(),
        scheduleDate: dateSchema,
    }),
});
exports.noteValidation = {
    createNotesSchema,
    updateNotesSchema,
};
