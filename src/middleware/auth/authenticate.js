import { extractToken } from "../../infrastructure/auth/extract-token.js";
import { verifyAccessToken } from "../../infrastructure/auth/verify-jwt-token.js";

export const authenticate = (req, res, next) => {
  
  const token = extractToken(req);
  const payload = verifyAccessToken(token);
 
  req.user = {
    id: payload.sub ?? payload.user,
    email: payload.email,
    role: payload.role
  };
  
  next()
}