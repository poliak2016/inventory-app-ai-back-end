import { getExecutor } from "../db/executor.js";
import { qCreateSuppliers, qGetAll } from "../query/suppliers.query.js";

export const suppliersRepository = {
  async create({name, email, phoneNumber, organizationId},  db=null){
    const executor = getExecutor(db)
    const { rows } = await executor.query(qCreateSuppliers, [organizationId, name, email, phoneNumber])
    return rows[0]
  },
  async getAll(organization_id, db=null){
    const executor = getExecutor(db)
    const {rows  } = await executor.query(qGetAll, [organization_id])
    return rows
  }
}

