import { createStockMovementRepository} from "../repositories/stock_movements.repository";

export const createStockMovementService = async(productId)=> {
  if(!productId){
    return "Product id is required"
  }
const result = await createStockMovementRepository()

return result 
}