import { AuthError } from "../../errors/autorization/authErrors.js"

export const extractToken = (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AuthError("Authorization header missing");
  };

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    throw new AuthError("Invalid authorization format");
  };

  return token
}