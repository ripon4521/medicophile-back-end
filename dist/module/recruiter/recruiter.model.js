"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecruiterModel = void 0;
const mongoose_1 = require("mongoose");
const RecruiterSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    company_description: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    website: {
        type: String
    },
    logo: {
        type: String
    },
}, { timestamps: true });
exports.RecruiterModel = (0, mongoose_1.model)("Recruiter", RecruiterSchema);
