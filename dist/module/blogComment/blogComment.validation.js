"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogCommentValidation = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
const createBlogCommentSchema = zod_1.z.object({
    body: zod_1.z.object({
        userType: zod_1.z.enum(["admin", "student", "teacher"]),
        userId: ObjectIdSchema,
        blogId: ObjectIdSchema,
        comment: zod_1.z.string().min(1),
    }),
});
const updateBlogCommentSchema = zod_1.z.object({
    body: zod_1.z.object({
        comment: zod_1.z.string().min(1).optional(),
        status: zod_1.z.enum(["approved", "pending", "rejected"]).optional(),
    }),
});
exports.blogCommentValidation = {
    createBlogCommentSchema,
    updateBlogCommentSchema,
};
