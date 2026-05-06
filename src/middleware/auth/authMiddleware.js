import { AuthError } from "../../errors/autorization/authErrors.js";
import { extractToken } from "../../infrastructure/auth/extract-token.js";
import { verifyAccessToken } from "../../infrastructure/auth/verify-jwt-token.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = extractToken(req);

    if (!token) {
      throw new AuthError("Authentication is required");
    }

    const payload = await verifyAccessToken(token);
  

    if (!payload.sub || !payload.organization_id) {
      throw new AuthError("Invalid token payload");
    }

    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      organization_id: payload.organization_id,
    };

    return next();
  } catch (err) {
    return next(err);
  }
};