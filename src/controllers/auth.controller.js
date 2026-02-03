import { asyncHandler } from "../middleware/api/async-handler.middleware.js";
import { registrUser } from "../services/auth.service.js";

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