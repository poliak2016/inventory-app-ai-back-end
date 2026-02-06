import jwt from "jsonwebtoken"
import {JWT_SECRET} from "../../config/env.js"
import { AuthError } from "../../errors/autorization/authErrors.js"

export const verifyJWT = (token) =>{
  try{
    return jwt.verify(token, JWT_SECRET)
  } catch {
    throw new AuthError("Invalid or expired token");
  }
}