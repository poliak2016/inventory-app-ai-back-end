import { query } from "../db/query.js";
import { qCreateRefreshToken, qFindValidByHash, qRevokeById } from "../model/token.model.js";

export const qreateRefreshTokenRepo = async({userId, tokenHash, expiresAt}) =>{
  const {rows} = await query(qCreateRefreshToken, [userId, tokenHash, expiresAt])
  return rows[0]
}

export const findByHashRepo = async(tokenHash) => {
  const {rows} = await query(qFindValidByHash, [tokenHash])
  return rows[0] || null;
}

export const revokedByIdRepo = async(id) =>{
   const {rows} = await query(qRevokeById, [id])
   return rows[0] || null
}