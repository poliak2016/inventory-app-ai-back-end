import { asyncHandler } from "../middleware/api/async-handler.middleware.js";
import { registrUser } from "../services/autorithation.service.js";

export const createUser = asyncHandler(async(req, res) =>{
  const {name, password, email} =req.body;
 console.log("headers content-type:", req.headers["content-type"]);
console.log("body:", req.body);
  const newUser = await registrUser({name, password, email})
  return res.status(201).json({
    name: newUser.name,
    id: newUser.id,
    email: newUser.email,
    role: newUser.role,
  });
})