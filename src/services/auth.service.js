import { env } from "../config/env.js";
import bcrypt from "bcrypt"
import { userRepository } from "../repositories/user.repository.js";
import { AuthError, ConflictError } from "../errors/autorization/authErrors.js";
import { signAccessToken, signRefreshToken } from "../infrastructure/auth/signJWT.js"; 
import { verifyRefreshToken } from "../infrastructure/auth/verify-jwt-token.js";



export const registerUserService = async({name, email, password}) =>{

  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new ConflictError("User already exist")
  };

  const passwordHash = await bcrypt.hash(password, env.BCRYPT_SALT_ROUNDS)

  const newUser = await userRepository.createUser({
    name,
    email, 
    passwordHash,
    role: "user"
    });
    return newUser;
};

  export const loginUserService = async({password, email})=> {
  const user = await userRepository.findByEmail(email)
  if (!user){
    throw new AuthError("Invalid email or password");
  }

  const isValid = await bcrypt.compare(password, user.passwordHash)
  if (!isValid) {
    throw new AuthError("Invalid email or password");
  }
    

  return ({
    accessToken: signAccessToken({
      sub: user.id,
      email: user.email,
      role: user.role
    }),
    refreshToken: signRefreshToken({
      sub: user.id
      })
    });

    
  };

export const getMeService = async(userId) =>{
  const user = await userRepository.findById(userId);

  if(!user){
    throw new AuthError("User not found")
  }
  return user
};

export const refreshUserService = async(refreshToken) =>{
  const payload = verifyRefreshToken(refreshToken);

  // const tokenHash = hash(payload)

  const user = await userRepository.findById(payload.sub);
  if (!user) throw new AuthError("User not found");


  return {
    accessToken: signAccessToken({ 
      sub: user.id, 
      email: user.email, 
      role: user.role 
    }),
    refreshToken: signRefreshToken({ 
      sub: user.id
    }),
  };
}
