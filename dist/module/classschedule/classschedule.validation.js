"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classScheduleSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
const daySchema = zod_1.z.object({
    day: zod_1.z.string().min(1, { message: "Day is required" }),
    time: zod_1.z.string().min(1, { message: "Time is required" }).optional(),
});
exports.classScheduleSchema = zod_1.z.object({
    body: zod_1.z.object({
        day: zod_1.z.array(daySchema).min(1, { message: "Day is required" }),
        courseId: ObjectIdSchema,
        facultyId: ObjectIdSchema,
    }),
});
