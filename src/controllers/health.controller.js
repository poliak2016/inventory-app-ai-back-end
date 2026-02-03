import {query} from "../db/query.js" 
import { asyncHandler } from "../middleware/api/async-handler.middleware.js";
import { initRedis } from "../infrastructure/redis/redis.client.js";

export const healthCheck = asyncHandler(async(req, res) => {
  const result = await query(`SELECT NOW()`)

  return res.status(200).json({ 
    status: "OK", 
    timestamp: new Date().toISOString() ,
    db: {
      status: "connected",
      now: result.rows[0].now
    },
    redis:  initRedis()
  });
});
