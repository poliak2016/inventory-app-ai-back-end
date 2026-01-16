import {env} from "./env.js"
import {createClient} from "redis"
import {logger} from "./logger.js"

export const redis = createClient({
  url: env.REDIS_URL
});

logger.info("Redis is alive")

redis.on("error", (err) => {
  logger.error(`Redis error: ${err.message}`
  )
});