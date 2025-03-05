"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseValidation = void 0;
const zod_1 = require("zod");
const createCourseSchema = zod_1.z.object({
    body: zod_1.z.object({
        course_code: zod_1.z.string().min(1, "Course code is required"),
        course_name: zod_1.z.string().min(1, "Course name is required"),
        credits: zod_1.z.number().positive("Credits must be a positive number"),
        department: zod_1.z.string().min(1, "Department is required"),
        prerequisites: zod_1.z.array(zod_1.z.string()).optional()
    })
});
const updateCourseSchema = zod_1.z.object({
    body: zod_1.z.object({
        course_code: zod_1.z.string().min(1, "Course code is required").optional(),
        course_name: zod_1.z.string().min(1, "Course name is required").optional(),
        credits: zod_1.z.number().positive("Credits must be a positive number").optional(),
        department: zod_1.z.string().min(1, "Department is required").optional(),
        prerequisites: zod_1.z.array(zod_1.z.string()).optional().optional()
    })
});
exports.courseValidation = {
    createCourseSchema,
    updateCourseSchema,
};
