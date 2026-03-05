import { qCreateRefreshToken, qFindValidByHash, qRevokeAllForUser, qRevokeByHash, qRevokeById } from "../model/token.model.js";


export const refreshTokenRepo= {

 async CreateRefreshToken(db, {id, userId, tokenHash, expiresAt}){
  const {rows} = await db.query(qCreateRefreshToken, [
    id, 
    userId,
    tokenHash, 
    expiresAt
  ])
  return rows[0]
},

async findByHash(db, tokenHash){
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
  const {res} = await db.query(qRevokeAllForUser, [user_id])
  return {
    rowCount: res.rowCount, 
    rows: res.rows
  }
}
}

