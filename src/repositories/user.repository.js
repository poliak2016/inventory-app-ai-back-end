import { query } from "../db/query"
import { qFindById, qCreate, qFindByEmail } from "../model/user.model"

export const userRepository = {
// Find user by id
  async findById(id) {
    const {rows} = await query(qFindById, [id])
    return rows[0] ?? null
  },
// Find user by email
  async findByEmail (email){
    const {rows} = await query(qFindByEmail, [email])
    return rows[0] ?? null
  },
// Create user 
  async createUser({email, passwordHash, role}) {
    const {rows} = await query(qCreate, [email, passwordHash, role])
    return rows[0] ?? null
  }
}