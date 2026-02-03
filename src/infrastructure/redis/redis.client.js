import { env } from "../../config/env.js";
import { createClient } from "redis";
import { logger } from "../../config/logger.js";

let redisClient = null;
let initPromise = null;

const noopRedis = {
  get: async () => null,
  set: async () => "OK",
  del: async () => 0,
  quit: async () => "OK",
  disconnect: async () => {},
};

const isRedisEnabled = () =>
  env.REDIS_ENABLE === true || env.REDIS_ENABLE === "true";

export const initRedis = async () => {
  if (redisClient) return redisClient;         
  if (initPromise) return initPromise;  

  initPromise = (async () => {
    if (!isRedisEnabled()) {
      logger.info("Redis disabled");
      redisClient = noopRedis;
      return redisClient;
    }

    try {
      const client = createClient({ url: env.REDIS_URL });

      client.on("error", (err) => {
        logger.error("Redis error", { message: err?.message });
      });

      await client.connect();
      logger.info("Redis connected");

      redisClient = client;
      return redisClient;
    } catch (err) {
      logger.warn("Redis unavailable, continuing without cache", {
        message: err?.message,
      });
      redisClient = noopRedis;
      return redisClient;
    } finally {
      initPromise = null;
    }
  })();

  return initPromise;
};

export const getRedis = () => redisClient ?? noopRedis;
