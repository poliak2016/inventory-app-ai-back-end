import { z } from "zod"

export const createSuppliersSchema = z.object({
  name: z.string({required_error: "Supplier name is required",
      invalid_type_error: "Supplier name must be a string"}).min(1, "Supplier name cannot be empty").max(255, "Name is too long"),
  email: z.string().email().trim().optional(),
  phoneNumber: z.string().optional() 
})