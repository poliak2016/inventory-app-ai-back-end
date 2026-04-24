import { getExecutor } from "../db/executor.js";
import { qCreateRefreshToken, qFindValidByHash, qFindByHash, qRevokeAllForUser, qRevokeByHash, qRevokeById } from "../model/token.query.js";


export const refreshTokenRepository= {

 async createRefreshToken({id, userId, tokenHash, expiresAt}, db = null){
  const executor = getExecutor(db);
  const { rows } = await executor.query(qCreateRefreshToken, [
    id,
    userId,
    tokenHash,
    expiresAt
  ])
  return rows[0]
},

async findByHash(tokenHash, db = null){
  const executor = getExecutor(db);
  const {rows} = await executor.query(qFindByHash, [tokenHash])
  return rows[0] || null;
},

async findValidByHash(tokenHash, db = null){
  const executor = getExecutor(db);
  const {rows} = await executor.query(qFindValidByHash, [tokenHash])
  return rows[0] || null;
},

async revokeById(id, db = null){
  const executor = getExecutor(db);
  const {rows} = await executor.query(qRevokeById, [id])
  return rows[0] || null
},

async revokeByHash(tokenHash, db = null){
  const executor = getExecutor(db);
  const {rows} = await executor.query(qRevokeByHash, [tokenHash])
  return rows[0] || null
},

async revokeByAllForUser(user_id, db = null){
  const executor = getExecutor(db);
  const result= await executor.query(qRevokeAllForUser, [user_id])
  return result;
}
}

