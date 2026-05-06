import { getExecutor } from "../db/executor.js";
import { qCreateCategory } from "../query/category.query.js";

export const categoryRepository = {
  async create (data, db=null){
    const executor = getExecutor(db);
    const {name, slug, organization_id} = data

    const { rows } = await executor.query(qCreateCategory, [name, slug, organization_id])

    return rows[0]
  }
}