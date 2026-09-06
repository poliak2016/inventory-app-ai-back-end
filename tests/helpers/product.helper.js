import { api } from "../setup/testClient.js" 
import { createCategory } from "./category.helper.js"


export const createProduct = async (token) => {
  const category = await createCategory(token)
  const categoryId = category.body.data.id
  const product = {
    name: "test product",
    price: 1,
    quantity: 2,
    categoryId: categoryId
  }
  return await api.post("/api/products").set("Authorization", `Bearer ${token}`).send(product)
}