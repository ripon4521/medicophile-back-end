"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseDetailsValidation = exports.faqSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
// Reusable ObjectId validation
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
const optionalObjectId = zod_1.z.union([ObjectIdSchema, zod_1.z.literal("")]).optional();
// Optional string array element (non-empty string or "")
const optionalNonEmptyStringArray = zod_1.z
    .array(zod_1.z.union([zod_1.z.string().min(1), zod_1.z.literal("")]))
    .optional();
// FAQ Schema
exports.faqSchema = zod_1.z.object({
    question: zod_1.z.union([zod_1.z.string().min(1, "Question is required"), zod_1.z.literal("")]).optional(),
    answer: zod_1.z
        .array(zod_1.z.union([zod_1.z.string().min(1, "Answer can't be empty"), zod_1.z.literal("")]))
        .optional(),
});
// Create Schema (strict)
const createCourseDetailsZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        courseId: ObjectIdSchema,
        isCourseExist: zod_1.z
            .array(zod_1.z.string().min(1))
            .nonempty("At least one course must exist"),
        syllabus: zod_1.z.array(exports.faqSchema).optional(),
        courseDetails: zod_1.z.array(exports.faqSchema).optional(),
        instructors: zod_1.z.array(zod_1.z.custom((val) => mongoose_1.Types.ObjectId.isValid(val), {
            message: "Invalid ObjectId for instructor",
        })),
    }),
});
// Update Schema (flexible)
const updateCourseDetailsZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        isCourseExist: optionalNonEmptyStringArray,
        syllabus: zod_1.z.array(exports.faqSchema).optional(),
        courseDetails: zod_1.z.array(exports.faqSchema).optional(),
        instructors: zod_1.z
            .array(zod_1.z.custom((val) => mongoose_1.Types.ObjectId.isValid(val), {
            message: "Invalid ObjectId for instructor",
        }))
            .optional(),
    }),
});
exports.courseDetailsValidation = {
    createCourseDetailsZodSchema,
    updateCourseDetailsZodSchema,
};
