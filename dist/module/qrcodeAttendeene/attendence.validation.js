"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendenceSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
exports.AttendenceSchema = zod_1.z.object({
    body: zod_1.z.object({
        studentId: ObjectIdSchema,
    }),
});
