import {env} from "../../config/env.js" 
import jwt from "jsonwebtoken"

export const signJWT = (payload) => {
  return jwt.sign(payload, env.JWT_SECRET,{ expiresIn: env.JWT_EXPIRES_IN })
}