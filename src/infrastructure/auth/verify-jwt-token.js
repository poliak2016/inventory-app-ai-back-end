import jwt from "jsonwebtoken"
import {env} from "../../config/env.js"
import { AuthError } from "../../errors/autorization/authErrors.js"

export const verifyJWT = (token) =>{

  if(!env.JWT_SECRET){
    throw new Error("Secret not set")
  }
  try{
    return jwt.verify(token, env.JWT_SECRET)
  } catch (err){
    throw new AuthError(`Invalid or expired token, ${err.name}`);
  }
}