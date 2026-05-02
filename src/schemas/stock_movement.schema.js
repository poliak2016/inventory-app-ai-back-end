import {z} from "zod" 

export const createStockMovementSchema = z.object({
  productId: z.uuid(),
  type: z.enum(["in", "out", "adjustment"]),
  quantity: z.number().int().positive(),
  note: z.string().trim().max(500).optional()
});