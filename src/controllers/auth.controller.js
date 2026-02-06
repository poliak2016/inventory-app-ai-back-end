import { asyncHandler } from "../middleware/api/async-handler.middleware.js";
import { registrUser, getAllUsers, authService } from "../services/auth.service.js";

export const createUser = asyncHandler(async(req, res) =>{
  const {name, password, email} =req.body;
 
  const newUser = await registrUser({name, password, email})
  return res.status(201).json({
    name: newUser.name,
    id: newUser.id,
    email: newUser.email,
    role: newUser.role,
  });
})

export const getUser = asyncHandler(async(req,res) =>{
  const users = await getAllUsers()
  res.status(200).json({
    message: "success",
    data: users
  })
})

export const login = asyncHandler(async(req,res) => {
  const {email, password} = req.body;

  const token = await authService.login({email, password});

  res.status(200).json({
    status: "success",
    accessToken: token,
  });
})