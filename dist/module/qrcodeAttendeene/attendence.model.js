"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const attendanceSchema = new mongoose_1.Schema({
    studentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    insertTime: {
        type: Date,
        default: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
    batchStudent: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "BatchStudent",
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: {
        currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
});
const Attendence = (0, mongoose_1.model)("Attendence", attendanceSchema);
exports.default = Attendence;
