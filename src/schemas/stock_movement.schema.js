import { z } from "zod";

export const createStockMovementSchema = z.object({
  productId: z.string().uuid(),
  type: z.enum(["in", "out", "adjustment"]),
  quantity: z.number().int().positive(),
  note: z.string().trim().max(500).optional(),
});

export const stockMovementParamsSchema = z.object({
  productId: z.string().uuid(),
});

export const stockMovementHistoryQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});
