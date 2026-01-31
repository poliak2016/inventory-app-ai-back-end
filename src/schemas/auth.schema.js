import { z } from "zod"

export const registerSchema = z.object({
  email: z.string().trim().email("Invalid email").includes("@"),
  password: z.string().min(8, "Password must be at least 8 characters")
})