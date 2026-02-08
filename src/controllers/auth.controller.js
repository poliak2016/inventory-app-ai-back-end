import { asyncHandler } from "../middleware/api/async-handler.middleware.js";
import { registerUser, authService, getMe } from "../services/auth.service.js";



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
  const user = await getMe(req.user.id);

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