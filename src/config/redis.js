import {env} from "./env.js"
import {createClient} from "redis"
import {logger} from "./logger.js"


let redis = null;

export const initRedis = async () => {

  if(!env.REDIS_ENABLE) {
    logger.info("Redis disabled")
    return null
  }


try{
  redis = createClient({url: env.REDIS_URL});

  redis.on("error", (err) => {
    logger.error(`Redis error ${err}`)
   });

  await redis.connect();
   logger.info("Redis connected")
   return redis
} catch (err){
  logger.error(`Redis connection failed, continuing without cache, ${err}`);
  return null
}
};

export const getRedis = () => redis;
