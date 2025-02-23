import { z } from "zod";

// Skill Zod Schema
const createSkill = z.object({
    body:z.object({
        name: z.string().min(1, { message: "Skill name is required" }),
        category: z.enum(["technical", "soft_skills"], {
          errorMap: () => ({ message: "Category must be either 'technical' or 'soft_skills'" }),
        }),
        description: z.string().optional(),
    })
  // Optional description
});
const updateSkill = z.object({
    body:z.object({
        name: z.string().min(1, { message: "Skill name is required" }),
        category: z.enum(["technical", "soft_skills"], {
          errorMap: () => ({ message: "Category must be either 'technical' or 'soft_skills'" }),
        }),
        description: z.string().optional(),
    })
  // Optional description
});



export const skillValidation = {
  createSkill,
  updateSkill,
};
