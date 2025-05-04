"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offlineBatchValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
const createOfflineBatchSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        courseId: ObjectIdSchema,
    }),
});
const updateOfflineBatchSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required").optional(),
    }),
});
exports.offlineBatchValidation = {
    createOfflineBatchSchema,
    updateOfflineBatchSchema,
};
