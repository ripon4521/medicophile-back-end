"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchStudentModel = void 0;
const mongoose_1 = require("mongoose");
const batchStudentSchema = new mongoose_1.Schema({
    batchId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "OfflineBatch",
        required: true,
    },
    courseId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Course", required: true },
    studentId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: {
        currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
});
exports.BatchStudentModel = (0, mongoose_1.model)("BatchStudent", batchStudentSchema);
