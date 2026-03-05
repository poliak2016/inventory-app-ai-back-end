import { crypto } from "crypto"

export const hashRefreshToken = async(token) =>{
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex")
}