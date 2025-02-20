"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillModel = void 0;
const mongoose_1 = require("mongoose");
const SkillSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    category: { type: String, enum: ["technical", "soft_skills"], required: true },
    description: { type: String },
}, { timestamps: true });
exports.SkillModel = (0, mongoose_1.model)("Skill", SkillSchema);
