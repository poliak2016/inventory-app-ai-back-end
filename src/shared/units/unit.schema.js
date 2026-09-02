import { z } from 'zod'

export const unitEnum = z.enum(["g", "kg", "ml", "l", "pcs"], {
  error: (issue) => issue.input === undefined ? "Unit is required" : `Unit must be one of the ${issue.values.join(", ")}`
})