import { env } from "../../../config/env.js";
import bcrypt from "bcrypt"

export const hashPassword = async(password) =>{
  return bcrypt.hash(password, env.BCRYPT_SALT_ROUNDS)
} ;