"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lectureValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
const DurationSchema = zod_1.z.object({
    hour: zod_1.z.number().min(0, "Hour must be a positive number"),
    minute: zod_1.z.number().min(0, "Minute must be a positive number"),
    second: zod_1.z.number().min(0, "Second must be a positive number"),
});
const createLectureSchema = zod_1.z.object({
    body: zod_1.z.object({
        courseId: ObjectIdSchema,
        createdBy: ObjectIdSchema,
        lectureTitle: zod_1.z.string().min(1, "Lecture title is required"),
        description: zod_1.z.string().optional(),
        serveer: zod_1.z.string().min(1, "Server is required"),
        videoLink: zod_1.z.string().url("Invalid video link"),
        duration: DurationSchema,
        isFree: zod_1.z.enum(["yes", "no"]),
        status: zod_1.z.enum(["published", "drafted"]),
        sheduleDate: zod_1.z.string().datetime("Invalid date format"),
    }),
});
const updateLectureSchema = zod_1.z.object({
    body: zod_1.z.object({
        lectureTitle: zod_1.z.string().min(1, "Lecture title is required").optional(),
        description: zod_1.z.string().optional(),
        serveer: zod_1.z.string().min(1, "Server is required").optional(),
        videoLink: zod_1.z.string().url("Invalid video link").optional(),
        duration: DurationSchema.optional(),
        isFree: zod_1.z.enum(["yes", "no"]).optional(),
        status: zod_1.z.enum(["published", "drafted"]).optional(),
        sheduleDate: zod_1.z.string().datetime("Invalid date format").optional(),
    }),
});
exports.lectureValidation = {
    createLectureSchema,
    updateLectureSchema,
};
