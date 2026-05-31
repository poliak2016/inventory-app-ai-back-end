import { getExecutor } from "../db/executor.js";
import { qCreate, qGetOrganizationById, qUpdateOrganization } from "../query/organization.query.js";

export const organizationRepository = {
  async createOrganization(organizationName, db = null) {
    const executor = getExecutor(db);
    const { rows } = await executor.query(qCreate, [organizationName]);
    return rows[0];
  },

  async findById(id, db = null) {
    const executor = getExecutor(db);
    const { rows } = await executor.query(qGetOrganizationById, [id]);
    return rows[0] ?? null;
  },

  async update(id, name, db = null) {
    const executor = getExecutor(db);
    const { rows } = await executor.query(qUpdateOrganization, [name, id]);
    return rows[0] ?? null;
  }
}