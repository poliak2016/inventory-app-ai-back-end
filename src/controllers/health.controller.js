import {query} from "../db/query.js" 
import { asyncHandler } from "../middleware/api/async-handler.middleware.js";
import { getRedis} from "../infrastructure/redis/redis.client.js";

export const healthCheck = asyncHandler(async(req, res) => {
  const result = await query(`SELECT NOW()`);
  const redis = getRedis();

  return res.status(200).json({ 
    status: "OK", 
    timestamp: new Date().toISOString() ,
    db: {
      status: "connected",
      now: result.rows[0].now
    },

    redis: {
      connected: redis.isReady,
    }
  });
});
