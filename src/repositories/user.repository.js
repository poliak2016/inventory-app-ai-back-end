import { getExecutor } from "../db/executor.js";
import { qFindById, qCreate, qFindByEmail, qGetUser } from "../query/user.query.js";

export const userRepository = {
  async getAll(db = null) {
    const executor = getExecutor(db);
    const { rows } = await executor.query(qGetUser);
    return rows;
  },

  async findById(id, db = null) {
    const executor = getExecutor(db);
    const { rows } = await executor.query(qFindById, [id]);
    return rows[0] ?? null;
  },

  async findByEmail(email, db = null) {
    const executor = getExecutor(db);
    const { rows } = await executor.query(qFindByEmail, [email]);
    return rows[0] ?? null;
  },

  async createUser({ name, email, passwordHash, role }, db = null) {
    const executor = getExecutor(db);
    const { rows } = await executor.query(qCreate, [name, email, passwordHash, role]);
    return rows[0] ?? null;
  }
};