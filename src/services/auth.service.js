import { pool } from "../db/pool.js";
import { userRepository } from "../repositories/user.repository.js";
import { refreshTokenRepository } from "../repositories/token.repository.js";
import { hashRefreshToken } from "../infrastructure/auth/helpers/tokenHash.js";
import { AuthError, ConflictError } from "../errors/autorization/authErrors.js";
import { signAccessToken, signRefreshToken } from "../infrastructure/auth/signJWT.js"; 
import { verifyRefreshToken } from "../infrastructure/auth/verify-jwt-token.js";
import { transactionFunc } from "../db/transaction.js";
import { expiresAt} from "../infrastructure/auth/helpers/refreshTokenExpiresAt.js";
import {hashPassword, comparePassword} from "../infrastructure/auth/helpers/passwordHash.js";
import { v4 as uuidv4 } from "uuid";

// REGISTER USER 
export const registerUserService = async({name, email, password}) =>{
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new ConflictError("User already exists")
  };
  const passwordHash = await hashPassword(password)
  const newUser = await userRepository.createUser({
    name,
    email, 
    passwordHash,
    role: "user"
    });
    return newUser;
};

// LOGIN USER 
  export const loginUserService = async({password, email})=> {

  const user = await userRepository.findByEmail(email)
  if (!user){
    throw new AuthError("Invalid email or password");
  }
  const isValid = await comparePassword(password, user.passwordHash)
  if (!isValid) {
    throw new AuthError("Invalid email or password");
  }
    
    const accessToken =  signAccessToken({
      sub: user.id,
      email: user.email,
      role: user.role
    });

    const refreshToken = signRefreshToken({
      sub: user.id
      });

    const tokenHash = hashRefreshToken(refreshToken);

    return transactionFunc(async(db) =>{ 
      await refreshTokenRepository.createRefreshToken(
      db, {
      id: uuidv4(),
      userId: user.id,
      tokenHash: tokenHash,
      expiresAt: expiresAt()
    });

    return {accessToken, refreshToken}
  });
}

//ME SERVICE
export const getMeService = async(userId) =>{
  const user = await userRepository.findById(userId);
  if(!user){
    throw new AuthError("User not found")
  }
  return user
};

export const logoutUserService = async(refreshToken) => {
 
    const tokenHash = hashRefreshToken(refreshToken)
    await refreshTokenRepository.revokeByHash(pool, tokenHash)
  }


// REFRESH TOKEN / ROTATION
export const refreshUserService = async (refreshToken) => {
  const payload = verifyRefreshToken(refreshToken);
  const tokenHash = hashRefreshToken(refreshToken);

  return transactionFunc(async (db) => {
    const valid = await refreshTokenRepository.findValidByHash(db, tokenHash);

    if (!valid) {
      const any = await refreshTokenRepository.findByHash(db, tokenHash);

      if (any?.revoked_at) {
        await refreshTokenRepository.revokeByAllForUser(db, any.user_id);
        throw new AuthError("Refresh token reuse detected");
      }

      throw new AuthError("Invalid refresh token");
    }

    if (valid.user_id !== payload.sub) {
      await refreshTokenRepository.revokeByAllForUser(db, valid.user_id);
      throw new AuthError("Refresh token mismatch detected");
    }

    await refreshTokenRepository.revokeById(db, valid.id);

    const newAccessToken = signAccessToken({ sub: valid.user_id });
    const newRefreshToken = signRefreshToken({ sub: valid.user_id });

    const newHash = hashRefreshToken(newRefreshToken);

    await refreshTokenRepository.createRefreshToken(db, {
      id: uuidv4(),
      userId: valid.user_id,
      tokenHash: newHash,
      expiresAt: expiresAt(),
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  });
};
