import  crypto  from "crypto"

export const hashRefreshToken = (token) =>{
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex")
}