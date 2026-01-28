import { env } from "../../config/env";
import { redis } from "../../config/redis";
import { rateLimitCounter } from "../../services/rateLimitCounter";

export const rateLimitMiddleware = async(req,res,next) =>{

  const result = await rateLimitCounter ({
    redis, 
    key: `rl: ${req.ip}`,
    windowSec: env.RATE_LIMIT_WINDOW_SEC,
    max: env.RATE_LIMIT_MAX
  });

  if(!result.allowed){
    return res.status(429).json({message: "Too many requests"})
  };

  next()
};