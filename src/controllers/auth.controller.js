import { env } from "../config/env.js";
import { TokenMissingError } from "../errors/autorization/authErrors.js";
import { asyncHandler } from "../middleware/api/async-handler.middleware.js";
import { authService } from "../services/auth.service.js";

const COOKIE_OPTIONS = (env) => ({
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/api/auth",
  maxAge: 30 * 24 * 60 * 60 * 1000,
});

export const authController = {
  register: asyncHandler(async (req, res) => {
    const { name, password, email, organizationName } = req.body;

    const newUser = await authService.register({ name, password, email, organizationName });

    return res.status(201).json({
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        organizationId: newUser.organization_id,
      },
    });
  }),

  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const { accessToken, refreshToken } = await authService.login({ email, password });

    res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS(env));

    return res.status(200).json({
      status: "success",
      data: { accessToken },
    });
  }),

  currentUser: asyncHandler(async (req, res) => {
    const user = await authService.getMe(req.user.id);

    return res.status(200).json({
      status: "success",
      data: { user },
    });
  }),

  refresh: asyncHandler(async (req, res) => {
    const refreshTokenFromCookie = req.cookies?.refreshToken;

    if (!refreshTokenFromCookie) {
      throw new TokenMissingError();
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await authService.refresh(refreshTokenFromCookie);

    res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS(env));

    return res.status(200).json({
      status: "success",
      data: { accessToken },
    });
  }),

  logout: asyncHandler(async (req, res) => {
    const refreshTokenFromCookie = req.cookies?.refreshToken;

    if (refreshTokenFromCookie) {
      await authService.logout(refreshTokenFromCookie);
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth",
    });

    return res.status(200).json({ status: "success" });
  }),
};
