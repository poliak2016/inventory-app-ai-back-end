import { env } from "./env.js";
import { createClient } from "redis";
import { logger } from "./logger.js";

let redisClient = null;

const noopRedis = {
  get: async () => null,
  set: async () => "OK",
  del: async () => 0,
  incr: async () => 1,
  expire: async () => true,
};

export const initRedis = async () => {
  if (!env.REDIS_ENABLE) {
    logger.info("Redis disabled");
    redisClient = noopRedis;
    return redisClient;
  }

  try {
    const client = createClient({ url: env.REDIS_URL });

    client.on("error", (err) => {
      logger.error("Redis error", { message: err.message });
    });

    await client.connect();
    logger.info("Redis connected");

    redisClient = client;
    return redisClient;
  } catch (err) {
    logger.warn("Redis unavailable, continuing without cache", {
      message: err.message,
    });
    redisClient = noopRedis;
    return redisClient;
  }
};

export const getRedis = () => redisClient ?? noopRedis;
