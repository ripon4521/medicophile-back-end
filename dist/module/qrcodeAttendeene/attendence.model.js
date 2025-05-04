"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const attendanceSchema = new mongoose_1.Schema({
    studentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
<<<<<<< HEAD
        ref: "User",
    },
    insertTime: {
        type: Date,
        default: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
=======
        ref: "User"
    },
    insertTime: {
        type: Date,
        default: new Date(new Date().getTime() + 6 * 60 * 60 * 1000)
>>>>>>> 893945e (Resolved merge conflicts)
    },
    batchStudent: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "BatchStudent",
    },
    isDeleted: {
        type: Boolean,
<<<<<<< HEAD
        default: false,
=======
        default: false
>>>>>>> 893945e (Resolved merge conflicts)
    },
}, {
    timestamps: {
        currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
<<<<<<< HEAD
    },
=======
    }
>>>>>>> 893945e (Resolved merge conflicts)
});
const Attendence = (0, mongoose_1.model)("Attendence", attendanceSchema);
exports.default = Attendence;
