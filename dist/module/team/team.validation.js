"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
const createTeamSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        description: zod_1.z.string().min(1, "Description is required").optional(),
        profileImg: zod_1.z
            .string()
            .url("Invalid URL format for profile image")
            .optional(),
        createdBy: ObjectIdSchema,
        members: zod_1.z
            .array(ObjectIdSchema, {
            required_error: "Members list is required",
            invalid_type_error: "Members must be a list of ObjectIds",
        })
            .optional(),
    }),
});
const updateTeamSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required").optional(),
        description: zod_1.z.string().min(1, "Description is required").optional(),
        profileImg: zod_1.z
            .string()
            .url("Invalid URL format for profile image")
            .optional(),
        createdBy: ObjectIdSchema.optional(),
        status: zod_1.z
            .enum(["Active", "Inactive", "Archived"], {
            required_error: "Status is required",
            invalid_type_error: "Status must be one of: active, inactive, archived",
        })
            .optional(),
        members: zod_1.z
            .array(ObjectIdSchema, {
            required_error: "Members list is required",
            invalid_type_error: "Members must be a list of ObjectIds",
        })
            .optional(),
    }),
});
exports.teamValidation = {
    createTeamSchema,
    updateTeamSchema,
};
