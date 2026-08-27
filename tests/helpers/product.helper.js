import { api } from "../setup/testClient.js" 


export const createProduct = async (token) => {
  const product = {
    name: "test product",
    price: 1,
    quantity: 2
  }
  return await api.post("/api/products").set("Authorization", `Bearer ${token}`).send(product)
}