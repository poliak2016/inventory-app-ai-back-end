import { query } from "../../src/db/query";
import { api } from "./testClient";

export const newUser = {
  name: "John",
  email: `john.${Date.now()}@dollar.com`,
  password: "12345678",
  role: "admin"
}

export const newProduct = {
  name: "Test Product",
  price: 10.99,
  quantity: 5,
}

export const createAdmin = async() =>{

  const adminUser = {
    email: `admin.${Date.now()}@dollar.com`,
    password: "12345678",
  };

await api.post("/api/auth/register").send(adminUser);

await query(`
  UPDATE users SET role = $1 WHERE email = $2`, 
  ["admin", adminUser.email]
);

const loginRes = await api.post("/api/auth/login").send(adminUser);

return loginRes.body.accessToken
} 

