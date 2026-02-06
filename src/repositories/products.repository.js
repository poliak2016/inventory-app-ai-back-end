import { logger } from "../config/logger.js";
import { query } from "../db/query.js";
import { qCreateProduct, qFindProductById, qDeleteProduct, qUpdateProduct, qGetAll } from "../model/products.model.js";

export const productsRepository = {
  async getAll(){
    const{rows} = await query(qGetAll);
    return rows
  },

  async findByID(id){
    const {rows} = await query(qFindProductById, [id]);
    return rows[0] ?? null;
  },
  
  async create({name,price, quantity}){
    
    const {rows} = await query(qCreateProduct, [
      name, 
      price, 
      quantity
      ])
    return rows[0];
  },

  async update(id,{name, price, quantity, category_id}){
    logger.info("SQL values", { values: [id, name, price, quantity, category_id] });

    const {rows} = await query(qUpdateProduct, [
      id, 
      name, 
      price,
      quantity,
      category_id
    ])
    return rows[0] ?? null;
  },

  async delete(id){
    const {rows} = await query(qDeleteProduct, [id])
    return rows[0] ?? null;
  }
}