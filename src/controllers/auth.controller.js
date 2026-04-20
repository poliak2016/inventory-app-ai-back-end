import { env } from "../config/env.js";
import { AuthError } from "../errors/autorization/authErrors.js";
import { asyncHandler } from "../middleware/api/async-handler.middleware.js";
import { registerUserService, loginUserService, getMeService, refreshUserService, logoutUserService } from "../services/auth.service.js";



export const createUserController = asyncHandler(async(req, res) =>{
  const {name, password, email} =req.body;
 
  const newUser = await registerUserService({name, password, email})
  console.log(newUser)
  return res.status(201).json({
    name: newUser.name,
    id: newUser.id,
    email: newUser.email,
    role: newUser.role,
  });
})

export const loginUserController = asyncHandler(async(req,res) => {
  const {email, password} = req.body;

  const {accessToken, refreshToken} = await loginUserService({email, password});
  
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
   
    path: "/api/auth",
    maxAge: 30 * 24 * 60 * 60 * 1000
  });

  return(res.status(200).json({
    status: "success",
    accessToken,
  })
)
});

export const getMeController = asyncHandler(async(req,res) =>{
  const user = await getMeService(req.user.id);

  res.status(200).json({
    message: "success",
    data: {user}
  });
});


export const refreshUserController = asyncHandler(async (req, res) => {
  const refreshTokenFromCookie = req.cookies?.refreshToken;

  if (!refreshTokenFromCookie) {
    throw new AuthError("Refresh token missing");
  }

  const { accessToken, refreshToken: newRefreshToken } =
    await refreshUserService(refreshTokenFromCookie);
    
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
   
    path: "/api/auth",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    status: "success",
    accessToken,
  });
});

export const logoutUserController = asyncHandler(async(req, res) => {
  const refreshTokenFromCookie = req.cookies?.refreshToken;


  if (refreshTokenFromCookie) {
    
    await logoutUserService?.(refreshTokenFromCookie);
  }

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/auth"
  });

  return res.status(200).json({ status: "success" });
})
