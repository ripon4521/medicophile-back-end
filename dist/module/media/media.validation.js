"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const createMediaZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z
      .string({ required_error: "Title is required" })
      .min(1, { message: "Title cannot be empty" }),
    media: zod_1.z
      .string({ required_error: "Media URL is required" })
      .url({ message: "Media must be a valid URL" }),
    createdBy: zod_1.z
      .string({ required_error: "CreatedBy is required" })
      .refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
        message: "Invalid CreatedBy ObjectId",
      }),
  }),
});
const updateMediaZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z
      .string({ required_error: "Title is required" })
      .min(1, { message: "Title cannot be empty" })
      .optional(),
    media: zod_1.z
      .string({ required_error: "Media URL is required" })
      .url({ message: "Media must be a valid URL" })
      .optional(),
    createdBy: zod_1.z
      .string({ required_error: "CreatedBy is required" })
      .refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
        message: "Invalid CreatedBy ObjectId",
      })
      .optional(),
  }),
});
exports.mediaValidation = {
  createMediaZodSchema,
  updateMediaZodSchema,
};
