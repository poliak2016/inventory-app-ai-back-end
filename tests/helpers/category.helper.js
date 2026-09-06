import { api } from "../setup/testClient.js";

export const createCategory = async(token) => {
  const category = {
    name: "testCategory"
  }

  return await api.post('/api/categories').set("Authorization", `Bearer ${token}`).send(category)
}