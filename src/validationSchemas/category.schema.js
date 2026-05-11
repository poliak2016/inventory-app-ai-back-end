import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string({
      required_error: "Category name is required",
      invalid_type_error: "Category name must be a string",
    })
    .min(1, "Category name cannot be empty")
    .max(100, "Category name is too long"),
});

export const updateCategorySchema = z.object({
  name: z
    .string({
      invalid_type_error: "Category name must be a string",
    })
    .min(1, "Category name cannot be empty")
    .max(100, "Category name is too long")
    .optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided for update",
});

export const categoryParamsSchema = z.object({
  id: z.string().uuid("Invalid category ID format"),
});
