import { z } from "zod";

const createDocsSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    document: z.string().url("Document must be a valid URL"),
  }),
});

const updateDocsSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").optional(),
    document: z.string().url("Document must be a valid URL").optional(),
  }),
});

export const docsValidation = {
  createDocsSchema,
  updateDocsSchema,
};
