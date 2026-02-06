import { query } from "../db/query.js"
import { qFindById, qCreate, qFindByEmail, qGetUser} from "../model/user.model.js"

export const userRepository = {
// Get users
  async getAll() {
    const { rows } = await query(qGetUser);
    return rows[0]

},
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
  async createUser({name, email, passwordHash, role}) {
    const {rows} = await query(qCreate, [name, email, passwordHash, role])
    return rows[0] ?? null
  }
}