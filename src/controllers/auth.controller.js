import { asyncHandler } from "../middleware/api/async-handler.middleware.js";
import { qFindById } from "../model/user.model.js";
import { registerUser, authService } from "../services/auth.service.js";
import { AuthError } from "../errors/autorization/authErrors.js";


export const createUser = asyncHandler(async(req, res) =>{
  const {name, password, email} =req.body;
 
  const newUser = await registerUser({name, password, email})
  return res.status(201).json({
    name: newUser.name,
    id: newUser.id,
    email: newUser.email,
    role: newUser.role,
  });
})

export const me = asyncHandler(async(req,res) =>{
  const user = await qFindById(req.user.sub);

  if(!user){
    throw new AuthError("User not found")
  }
  res.status(200).json({
    message: "success",
    data: {user}
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