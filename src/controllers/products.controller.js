import {
   getAll 
  } from "../services/products.service.js";

export const getProducts = async (req, res) => {
  const products = await getAll();
  res.status(200).json(products);
}



