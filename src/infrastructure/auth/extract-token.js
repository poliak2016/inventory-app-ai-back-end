import { AuthError } from "../../errors/autorization/authErrors.js"

export const extractToken = (req) => {
  const authHeader = req.headers.authorization;
 console.log("AUTH HEADER RAW:", req.headers.authorization);
console.log("HEADERS:", req.headers);
  if (!authHeader) {
    throw new AuthError("Authorization header missing");
  };

  const [type, token] = authHeader.trim().split();

  if (type?.toLowerCase() !== "bearer" || !token) {
    throw new AuthError("Invalid authorization format. Use: Bearer <token>");
  };

  return token
}