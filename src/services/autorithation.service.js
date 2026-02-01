import bcrypt from "bcrypt"
import { userRepository } from "../repositories/user.repository.js";
import { AuthError, ConflictError } from "../errors/autorithation/auth.js";


export const registrUser = async({name, email, password}) =>{

    if (!name || !email || !password){
    throw new AuthError("name/email/password are required")
  };

  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new ConflictError("User already exist")
  };

  const passwordHash = await bcrypt.hash(password, 8)

  const newUser = await userRepository.createUser({
    name,
    email, 
    passwordHash,
    role: "user"
    });
    return newUser;
};

