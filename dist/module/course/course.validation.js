"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
// ObjectId Schema
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
const optionalObjectId = zod_1.z.union([ObjectIdSchema, zod_1.z.literal("")]).optional();
// Optional helpers that allow empty string
const optionalString = (msg) => zod_1.z.union([zod_1.z.string().min(1, msg), zod_1.z.literal("")]).optional();
const optionalNumber = (msg) => zod_1.z.union([zod_1.z.number(), zod_1.z.literal("")]).optional();
const optionalArray = () => zod_1.z.union([zod_1.z.array(zod_1.z.string()).nonempty(), zod_1.z.literal("")]).optional();
const requiredString = (msg) => zod_1.z.string().min(1, { message: msg });
const requiredNumber = (msg) => zod_1.z.number({ required_error: msg });
// Create Schema
const createCourseSchema = zod_1.z.object({
    body: zod_1.z.object({
        cover_photo: optionalString("Cover photo URL is required."),
        prefix: optionalString("Prefix is requried"),
        course_title: requiredString("Course title is required."),
        description: requiredString("Description is required."),
        duration: requiredString("Duration is required."),
        preOrder: zod_1.z.enum(["on", "off"], {
            message: "PreOrder must be either 'on' or 'off'.",
        }),
        course_type: zod_1.z.enum(["online", "offline"], {
            message: "Course type must be either 'online' or 'offline'.",
        }),
        category: ObjectIdSchema,
        createdBy: ObjectIdSchema,
        expireTime: requiredString("Expire time is required."),
        daySchedule: zod_1.z
            .array(zod_1.z.string())
            .nonempty({ message: "Day schedule cannot be empty." }),
        timeShedule: zod_1.z
            .array(zod_1.z.string())
            .nonempty({ message: "Time schedule cannot be empty." }),
        price: requiredNumber("Price must be a non-negative number."),
        offerPrice: optionalNumber("Offer price must be a non-negative number."),
        takeReview: zod_1.z
            .enum(["on", "off"], {
            message: "Take review must be either 'on' or 'off'.",
        })
            .optional(),
        status: zod_1.z.enum(["active", "inactive"], {
            message: "Status must be either 'active' or 'inactive'.",
        }),
    }),
});
// Update Schema
const updateCourseSchema = zod_1.z.object({
    body: zod_1.z.object({
        cover_photo: optionalString("Cover photo URL is required."),
        prefix: optionalString("Prefix is requeried"),
        course_title: optionalString("Course title is required."),
        description: optionalString("Description is required."),
        duration: optionalString("Duration is required."),
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
        category: optionalObjectId,
        createdBy: optionalObjectId,
        expireTime: optionalString("Expire time must be a valid date."),
        daySchedule: optionalArray(),
        timeShedule: optionalArray(),
        price: optionalNumber("Price must be a non-negative number."),
        offerPrice: optionalNumber("Offer price must be a non-negative number."),
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
        course_tag: optionalArray(),
    }),
});
exports.courseValidation = {
    createCourseSchema,
    updateCourseSchema,
};
