import { z } from "zod"

export const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().trim().email("Invalid email").includes("@"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.string()
});

export const loginSchema = z.object({
  password: z.string().min(8),
  email: z.string().email()
});