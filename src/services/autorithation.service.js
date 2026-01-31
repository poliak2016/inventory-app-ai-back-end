import {bcrypt} from "bcrypt"
import { userRepository } from "../repositories/user.repository";
import { AuthError, ConflictError } from "../errors/autorithation/auth";


export const registrUser = async({email, password}) =>{

    if (!email || !password){
    throw new AuthError("email/password are required")
  };

  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new ConflictError("User already exist")
  };

  const passwordHash = await bcrypt(password, 8)

  const newUser = await userRepository.createUser({
    email, 
    passwordHash,
    role: "user"
    });
    return newUser;
};

