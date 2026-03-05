import { env } from "../../../config/env.js";
import {ms} from "ms"
export const expiresAt = () =>{
  return new Date(Date.now() + ms(env.JWT_REFRESH_EXPIRES_IN))
}