import { env } from "../../config/env.js";
import { getRedis } from "../../config/redis.js";
import { rateLimitCounter } from "../../services/rateLimitCounter.js";
import { logger } from "../../config/logger.js";

export const rateLimitMiddleware = async (req, res, next) => {
  try {
    const redis = getRedis();
    
    if (!redis) {
      logger.warn("Redis client not available, rate limiting disabled");
      return next();
    }

    const result = await rateLimitCounter({
      redis,
      key: `rl:${req.ip}`,
      windowSec: env.RATE_LIMIT_WINDOW_SEC,
      max: env.RATE_LIMIT_MAX,
    });

    if (result.degraded) {
      logger.warn("Rate limiting degraded, allowing request", { 
        error: result.error 
      });
    }

    if (!result.allowed) {
      return res.status(429).json({ message: "Too many requests" });
    }

    next();
  } catch (err) {
    logger.error("Rate limiting middleware error", { 
      error: err.message 
    });
    
    next();
  }
};
