import { z } from "zod";

export const updateOrganizationSchema = z.object({
  name: z
    .string({
      required_error: "Organization name is required",
      invalid_type_error: "Organization name must be a string",
    })
    .min(1, "Organization name cannot be empty")
    .max(100, "Organization name is too long"),
});
