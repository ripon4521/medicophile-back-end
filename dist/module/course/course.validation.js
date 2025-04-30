"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
const createCourseSchema = zod_1.z.object({
    body: zod_1.z.object({
        cover_photo: zod_1.z
            .string()
            .min(1, { message: "Cover photo URL is required." })
            .optional(),
        course_title: zod_1.z.string().min(1, { message: "Course title is required." }),
        description: zod_1.z.string().min(1, { message: "Description is required." }),
        duration: zod_1.z.string().min(1, { message: "Duration is required." }),
        preOrder: zod_1.z.enum(["on", "off"], {
            message: "PreOrder must be either 'on' or 'off'.",
        }),
        course_type: zod_1.z.enum(["online", "offline"], {
            message: "Course type must be either 'online' or 'offline'.",
        }),
        category: ObjectIdSchema,
        createdBy: ObjectIdSchema,
        expireTime: zod_1.z.string({ required_error: "expire time is requried" }),
        daySchedule: zod_1.z
            .array(zod_1.z.string())
            .nonempty({ message: "Day schedule cannot be empty." }),
        timeShedule: zod_1.z
            .array(zod_1.z.string())
            .nonempty({ message: "Time schedule cannot be empty." }),
        price: zod_1.z
            .number()
            .min(0, { message: "Price must be a non-negative number." }),
        offerPrice: zod_1.z
            .number()
            .min(0, { message: "Offer price must be a non-negative number." }).optional(),
        takeReview: zod_1.z.enum(["on", "off"], {
            message: "Take review must be either 'on' or 'off'.",
        }).optional(),
        status: zod_1.z.enum(["active", "inactive"], {
            message: "Status must be either 'active' or 'inactive'.",
        }),
    }),
});
const updateCourseSchema = zod_1.z.object({
    body: zod_1.z.object({
        cover_photo: zod_1.z
            .string()
            .min(1, { message: "Cover photo URL is required." })
            .optional(),
        course_title: zod_1.z
            .string()
            .min(1, { message: "Course title is required." })
            .optional(),
        description: zod_1.z
            .string()
            .min(1, { message: "Description is required." })
            .optional(),
        duration: zod_1.z
            .string()
            .min(1, { message: "Duration is required." })
            .optional(),
        preOrder: zod_1.z
            .enum(["on", "off"], {
            message: "PreOrder must be either 'on' or 'off'.",
        })
            .optional(),
        course_type: zod_1.z
            .enum(["online", "offline"], {
            message: "Course type must be either 'online' or 'offline'.",
        })
            .optional(),
        category: ObjectIdSchema.optional(),
        createdBy: ObjectIdSchema.optional(),
        expireTime: zod_1.z
            .string({ message: "Expire time must be a valid date." })
            .optional(),
        daySchedule: zod_1.z
            .array(zod_1.z.string())
            .nonempty({ message: "Day schedule cannot be empty." })
            .optional(),
        timeShedule: zod_1.z
            .array(zod_1.z.string())
            .nonempty({ message: "Time schedule cannot be empty." })
            .optional(),
        price: zod_1.z
            .number()
            .min(0, { message: "Price must be a non-negative number." })
            .optional(),
        offerPrice: zod_1.z
            .number()
            .min(0, { message: "Offer price must be a non-negative number." })
            .optional(),
        takeReview: zod_1.z
            .enum(["on", "off"], {
            message: "Take review must be either 'on' or 'off'.",
        })
            .optional(),
        status: zod_1.z
            .enum(["active", "inactive"], {
            message: "Status must be either 'active' or 'inactive'.",
        })
            .optional(),
        course_tag: zod_1.z
            .array(zod_1.z.string())
            .nonempty({ message: "At least one course tag is required." })
            .optional(),
    }),
});
exports.courseValidation = {
    updateCourseSchema,
    createCourseSchema,
};
