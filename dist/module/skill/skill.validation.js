"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillValidation = void 0;
const zod_1 = require("zod");
// Skill Zod Schema
const createSkill = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, { message: "Skill name is required" }),
        category: zod_1.z.enum(["technical", "soft_skills"], {
            errorMap: () => ({ message: "Category must be either 'technical' or 'soft_skills'" }),
        }),
        description: zod_1.z.string().optional(),
    })
    // Optional description
});
const updateSkill = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, { message: "Skill name is required" }),
        category: zod_1.z.enum(["technical", "soft_skills"], {
            errorMap: () => ({ message: "Category must be either 'technical' or 'soft_skills'" }),
        }),
        description: zod_1.z.string().optional(),
    })
    // Optional description
});
exports.skillValidation = {
    createSkill,
    updateSkill,
};
