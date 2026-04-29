import { AuthError } from "../../errors/autorization/authErrors.js";
import { extractToken } from "../../infrastructure/auth/extract-token.js";
import { verifyAccessToken } from "../../infrastructure/auth/verify-jwt-token.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = extractToken(req);

    if (!token) {
      throw new AuthError({ message: "Authentication is required" });
    }

    const payload = await verifyAccessToken(token);

    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };

    next();
  } catch (err) {
    throw new AuthError({
      message: err.message || "Invalid or expired token",
    });
  }
};