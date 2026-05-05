import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { env } from "../../config/env.js";

export const buildAccessTokenPayload = (user) => {
  return {
    sub: user.id,
    email: user.email,
    role: user.role,
    organization_id: user.organization_id,
  };
};

export const buildRefreshTokenPayload = (user) => {
  return {
    sub: user.id,
  };
};

export const signAccessToken = (user) => {
  return jwt.sign(
    buildAccessTokenPayload(user),
    env.JWT_ACCESS_SECRET,
    {
      expiresIn: env.JWT_ACCESS_EXPIRES_IN,
    }
  );
};

export const signRefreshToken = (user) => {
  return jwt.sign(
    {
      ...buildRefreshTokenPayload(user),
      jti: uuidv4(),
    },
    env.JWT_REFRESH_SECRET,
    {
      expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    }
  );
};