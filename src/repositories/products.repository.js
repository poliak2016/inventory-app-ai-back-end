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

  async create({name, quantity, price, categoryId}){
    const {rows} = await query(qCreateProduct, [
      name, 
      quantity, 
      price, 
      categoryId])
    return rows[0];
  },

  async update(id,{name, quantity, price, categoryId}){
    const {rows} = await query(qUpdateProduct, [
      id, 
      name, 
      quantity, 
      price, 
      categoryId
    ])
    return rows[0] ?? null;
  },

  async delete(id){
    const {rows} = await query(qDeleteProduct, [id])
    return rows[0] ?? null;
  }
}