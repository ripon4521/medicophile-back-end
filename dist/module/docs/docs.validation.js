"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.docsValidation = void 0;
const zod_1 = require("zod");
const createDocsSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    document: zod_1.z.string().url("Document must be a valid URL"),
  }),
});
const updateDocsSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required").optional(),
    document: zod_1.z.string().url("Document must be a valid URL").optional(),
  }),
});
exports.docsValidation = {
  createDocsSchema,
  updateDocsSchema,
};
