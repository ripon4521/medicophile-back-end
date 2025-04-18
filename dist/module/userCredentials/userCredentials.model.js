"use strict";
// models/userCredentials.model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCredentialsModel = void 0;
const mongoose_1 = require("mongoose");
const userCredentialsSchema = new mongoose_1.Schema({
    studentId: {
        type: mongoose_1.Types.ObjectId,
        ref: "Students",
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    accessToken: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
    ipAddress: {
        type: String,
        required: true,
    },
    deviceType: {
        type: String,
        required: true,
    },
    deviceName: {
        type: String,
        required: true,
    },
    deletedAt: {
        type: Date,
        default: null,
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
exports.UserCredentialsModel = (0, mongoose_1.model)("UserCredentials", userCredentialsSchema);
