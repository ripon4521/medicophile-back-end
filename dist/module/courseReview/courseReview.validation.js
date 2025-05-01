"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursReviewValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
// ObjectId validation
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
const createCourseReviewZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        studentId: ObjectIdSchema,
        courseId: ObjectIdSchema,
        rating: zod_1.z
            .number()
            .min(1, "Rating must be at least 1")
            .max(5, "Rating cannot be more than 5"),
        review: zod_1.z.string().min(1, "Review cannot be empty")
    })
});
const updateCourseReviewZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        rating: zod_1.z
            .number()
            .min(1, "Rating must be at least 1")
            .max(5, "Rating cannot be more than 5").optional(),
        review: zod_1.z.string().min(1, "Review cannot be empty").optional()
    })
});
exports.coursReviewValidation = {
    createCourseReviewZodSchema,
    updateCourseReviewZodSchema
};
