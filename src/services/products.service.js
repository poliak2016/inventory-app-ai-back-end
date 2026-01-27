import { v4 as uuid } from "uuid";
import {query} from "../db/query.js";
import { ValidationError } from "../errors/ValidationError.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { getRedis } from "../config/redis.js";
  
let redis = getRedis()

export const getAll = async () => {
   const cacheKey = 'products:all';
   const cached = await redis.get(cacheKey);
   if (cached) return JSON.parse(cached);
   const result = await  query(`
    SELECT * 
    FROM products 
    ORDER BY created_at DESC
    `);
   await redis.set(
    cacheKey, 
    JSON.stringify(result.rows),
    { EX: 60 }
   );
   return result.rows;
};

export const getProductId = async (id) => {
  const cacheKey = `products:${id}`;
  if (!id){
    throw new ValidationError("Product id is required")
  }
   const cached = await redis.get(cacheKey)
  if(cached) return JSON.parse(cached)
  const result = await query(
    `
    SELECT *
    FROM products
    WHERE id = $1
    `,
    [id]
    );
    const product = result.rows[0] || null
   await redis.set(
    cacheKey, 
    JSON.stringify(product),
    { EX: 60 }
   )
    return result.rows[0] || null
}

export const createProduct = async ({name, price, quantity}) => {
  if (!name || quantity===null || price === null){
    throw new ValidationError("name, quantity, price are required")
  }
  const id =uuid();
  const result = await query(
    `
    INSERT INTO products (id, name, price, quantity)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    ` ,
    [id, name, price, quantity]
  );
  await redis.del("products:all");
  return result.rows[0]
}

export const updateProduct = async (id, productData) => {
  if (!id){
    throw new ValidationError("Product id is required")
  }

  const {name, price, quantity} =productData;

  const result = await query(
    `
    UPDATE products
    SET 
      name = $2, 
      price= $3, 
      quantity = $4 
    WHERE id = $1
    RETURNING *
    `,
  [id, name, price, quantity]
);
  await redis.del(`products:${id}`);
  await redis.del("products:all");
    return result.rows[0] || null
}

export const deleteProduct = async (id) => {

   if (!id){
    throw new ValidationError("Product id is required")
  }
const result = await query (
  `
  DELETE FROM products 
  WHERE id = $1
  RETURNING *
  `,
  [id]
)

if (result.rowCount === 0) {
    throw new NotFoundError("Product not found");
  };
  await redis.del(`products:${id}`);
  await redis.del("products:all");
  return true;
}
