"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lectureValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
// Optional non-empty string or empty string (for optional fields)
const optionalNonEmptyString = zod_1.z.union([zod_1.z.string().min(1), zod_1.z.literal("")]).optional();
// Optional URL or empty string
const optionalURL = zod_1.z.union([zod_1.z.string().url({ message: "Invalid video URL" }), zod_1.z.literal("")]).optional();
const createLectureSchema = zod_1.z.object({
    body: zod_1.z.object({
        courseId: ObjectIdSchema,
        createdBy: ObjectIdSchema,
        moduleId: ObjectIdSchema,
        title: zod_1.z.string().min(1, { message: "Title is required" }),
        server: zod_1.z.string().min(1, { message: "Server is required" }),
        videoId: optionalNonEmptyString,
        duration: zod_1.z.number().min(1, { message: "Duration must be greater than 0" }),
        isFree: zod_1.z.boolean().optional(),
        status: zod_1.z.enum(["Published", "Drafted"], {
            required_error: "Status is required",
        }),
        scheduleDate: zod_1.z
            .preprocess((val) => {
            if (typeof val === "string" || val instanceof Date)
                return new Date(val);
            return val;
        }, zod_1.z.date())
            .optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
const updateLectureSchema = zod_1.z.object({
    body: zod_1.z.object({
        courseId: ObjectIdSchema.optional(),
        createdBy: ObjectIdSchema.optional(),
        moduleId: ObjectIdSchema.optional(),
        title: optionalNonEmptyString,
        server: optionalNonEmptyString,
        videoId: optionalNonEmptyString,
        duration: zod_1.z.number().min(1, { message: "Duration must be greater than 0" }).optional(),
        isFree: zod_1.z.boolean().optional(),
        status: zod_1.z.enum(["Published", "Drafted"]).optional(),
        scheduleDate: zod_1.z
            .preprocess((val) => {
            if (typeof val === "string" || val instanceof Date)
                return new Date(val);
            return val;
        }, zod_1.z.date())
            .optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
exports.lectureValidation = {
    createLectureSchema,
    updateLectureSchema,
};
