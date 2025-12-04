import { v4 as uuid } from "uuid";
import {products} from "../data/products.sample.js";

export const getAll = async () => [...products];

export const getProductId = async (id) => products.find((p) => p.id === id) || null; 

export const createProduct = async (productData) => {
  const newProduct = {
    id: uuid(),
    date: new Date(),
    ...productData
  }
  products.push(newProduct)
  return newProduct
}

export const updateProduct = async (id, productData) => {
  const index = products.findIndex((p)=> p.id === id);
  if (index === -1){
    return null 
  }
  const updatedProduct = {
    ...products[index],
    ...productData,
    updatedAt: new Date()
  }
  products[index] = updatedProduct
  return updatedProduct
}

export const deleteProduct = async (id) => {
  const index = products.findIndex((p)=> p.id === id);
  if (index === -1){
    return false
}
products.splice(index, 1)
return true
}