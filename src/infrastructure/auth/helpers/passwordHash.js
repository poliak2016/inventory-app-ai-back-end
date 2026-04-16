import { env } from "../../../config/env.js";
import bcrypt from "bcrypt"

export const hashPassword = async(password) =>{
  return bcrypt.hash(password, env.BCRYPT_SALT_ROUNDS)
} ;

export const comparePassword = async(password, hash) => {
  return bcrypt.compare(password, hash)
}