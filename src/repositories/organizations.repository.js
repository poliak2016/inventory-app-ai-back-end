import { getExecutor } from "../db/executor.js";
import { qCreate }  from "../model/organization.model.js";

export const organizationRepository = {
  async createOrganization(organizationName, db = null) {
    const executor = getExecutor(db);
    const { rows } = await executor.query(qCreate, [organizationName]);
    return rows[0];
  }
}