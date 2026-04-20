import { qCreateRefreshToken, qFindValidByHash, qFindByHash, qRevokeAllForUser, qRevokeByHash, qRevokeById } from "../model/token.model.js";


export const refreshTokenRepository= {

 async createRefreshToken(db, {id, userId, tokenHash, expiresAt}){
  const {rows} = await db.query(qCreateRefreshToken, [
    id, 
    userId,
    tokenHash, 
    expiresAt
  ])
  return rows[0]
},

async findByHash(db, tokenHash){
  const {rows} = await db.query(qFindByHash, [tokenHash])
  return rows[0] || null;
},

async findValidByHash(db, tokenHash){
  const {rows} = await db.query(qFindValidByHash, [tokenHash])
  return rows[0] || null;
},

async revokeById(db, id){
  const {rows} = await db.query(qRevokeById, [id])
  return rows[0] || null
},

async revokeByHash(db, tokenHash){
  const {rows} = await db.query(qRevokeByHash, [tokenHash])
  return rows[0] || null
},

async revokeByAllForUser(db, user_id){
  const result= await db.query(qRevokeAllForUser, [user_id])
  return result;
}
}

