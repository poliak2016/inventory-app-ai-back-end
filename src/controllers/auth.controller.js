import { asyncHandler } from "../middleware/api/async-handler.middleware";
import { registrUser } from "../services/autorithation.service";

export const createUser = asyncHandler(async(req, res) =>{
  const {password, email} =req.body;

  const newUser = await registrUser({password, email})
  return res.status(201).json({
    id: newUser.id,
    email: newUser.email,
    role: newUser.role,
  });
})