import { getRedis } from "./redis.client.js";

export const getCache = async (key) => {
  const redis = getRedis();
  const cached = await redis.get(key);
  return cached ? JSON.parse(cached) : null;
}

export const setCache = async (key, value, TTL=60) => {
  const redis = getRedis();
  await redis.set(
    key, 
    JSON.stringify(value),
    {EX: TTL} 
  )
}

export const delCache = async(...keys) => {
  const redis = getRedis();
  if(!keys.length) return
  await redis.del(keys)
}
