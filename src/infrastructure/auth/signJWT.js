import {env} from "../../config/env.js" 
import jwt from "jsonwebtoken"

export const signAccessToken = (payload) => {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET,{ 
    expiresIn: env.JWT_ACCESS_EXPIRES_IN 
  });
};

export const signRefreshToken = (payload) => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET,{ 
    expiresIn: env.JWT_REFRESH_EXPIRES_IN 
  });
};

