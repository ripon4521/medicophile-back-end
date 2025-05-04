"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseDetailsValidation = exports.faqSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
exports.faqSchema = zod_1.z.object({
    question: zod_1.z.string().min(1, "Question is required").optional(),
    answer: zod_1.z.array(zod_1.z.string().min(1, "Answer can't be empty")).optional(),
});
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
const updateCourseDetailsZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        isCourseExist: zod_1.z
            .array(zod_1.z.string().min(1))
            .nonempty("At least one course must exist")
            .optional(),
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
