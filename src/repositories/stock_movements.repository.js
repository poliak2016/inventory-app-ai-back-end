import { getExecutor } from "../db/executor.js";
import { qCreateMovements } from "../model/stock_movements.query.js";

export const createStockMovementRepository = async(data, db=null) =>{
  
  const executor = getExecutor(db)

  const { rows 
  } = await executor.query(qCreateMovements, [
    data.productId, 
  data.createdBy,   
  data.type,     
  data.quantity,    
  data.note ?? null 
  ]);

  return rows[0] ?? null;
}