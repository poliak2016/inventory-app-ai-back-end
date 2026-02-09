import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string({
      required_error: "Product name is required",
      invalid_type_error: "Product name must be a string",
    })
    .min(1, "Product name cannot be empty")
    .max(255, "Product name is too long"),

  price: z.number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .positive("Price must be greater than 0"),

  quantity: z.number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .int("Quantity must be an integer")
    .nonnegative("Quantity cannot be negative"),

  categoryId: z
    .string({
      // required_error: "Category ID is required",
      invalid_type_error: "Category ID must be a string",
    })
    .uuid("Category ID must be a valid UUID").optional()
});

export const validateIdSchema = (name = "id") => z.object({
  [name]: z.string().uuid("Invaid ID format"),
})

export const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  price: z.coerce.number().positive().optional(),
  quantity: z.coerce.number().int().nonnegative().optional(),
});