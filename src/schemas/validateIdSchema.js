import { z } from "zod"

export const validateIdSchema =(name = "id") => {
 return z.object({
     [name]: z.string().uuid("Invalid id format")
  })
}

