"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
// ObjectId validation
const ObjectIdSchema = zod_1.z
  .string()
  .refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
  });
const createModuleSchema = zod_1.z.object({
  body: zod_1.z.object({
    moduleTitle: zod_1.z.string().min(1),
    courseId: ObjectIdSchema,
    createdBy: ObjectIdSchema,
  }),
});
const updateModuleSchema = zod_1.z.object({
  body: zod_1.z.object({
    moduleTitle: zod_1.z.string().min(1).optional(),
    courseId: ObjectIdSchema.optional(),
    createdBy: ObjectIdSchema.optional(),
  }),
});
exports.moduleValidation = {
  createModuleSchema,
  updateModuleSchema,
};
