import bcrypt from "bcrypt"
import { userRepository } from "../repositories/user.repository.js";
import { AuthError, ConflictError } from "../errors/autorization/authErrors.js";
import { signJWT } from "../infrastructure/auth/signJWT.js"; 


export const registerUser = async({name, email, password}) =>{

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

export const getMe = async(userId) =>{
  const user = await userRepository.findById(userId);

  if(!user){
    throw new AuthError("User not found")
  }
  return user
};

  export const authService = { 
  async login ({password, email}) {
  const user = await userRepository.findByEmail(email)
  if (!user){
    throw new AuthError("Invalid email or password");
  }

  const isValid = await bcrypt.compare(password, user.passwordHash)
  if (!isValid) {
    throw new AuthError("Invalid email or password");
  }

  return signJWT({
    sub: user.id,
    email: user.email,
    role: user.role
    });
  }
}
