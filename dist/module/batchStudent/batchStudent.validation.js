"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.batchStudentValidation = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
const createBatchStudentSchema = zod_1.z.object({
    body: zod_1.z.object({
        batchId: ObjectIdSchema,
        courseId: ObjectIdSchema,
        studentId: ObjectIdSchema
    })
});
const updateBatchStudentSchema = zod_1.z.object({
    body: zod_1.z.object({
        batchId: ObjectIdSchema.optional(),
        courseId: ObjectIdSchema.optional(),
        studentId: ObjectIdSchema.optional()
    })
});
exports.batchStudentValidation = {
    createBatchStudentSchema,
    updateBatchStudentSchema
};
