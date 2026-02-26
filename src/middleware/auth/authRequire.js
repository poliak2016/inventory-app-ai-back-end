import { AuthError } from "../../errors/autorization/authErrors";
import { ValidationError } from "../../errors/products/productErrors";
import { extractToken } from "../../infrastructure/auth/extract-token.js";
import { verifyAccessToken } from "../../infrastructure/auth/verify-jwt-token.js";

export const authRequire = async(req, res, next) =>{

  try{
    const token = extractToken(req);
    
    if(!token){
      throw new AuthError({message: "Authentication are required"})
    }
    console.log(req.headers);
    const payload =verifyAccessToken(token)
    
    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role
    }

    next()
  } catch{
  throw new ValidationError("Invalid or expired token")
}
}
