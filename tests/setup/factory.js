import { query } from "../../src/db/query";
import { api } from "./testClient";

export const newUser = {
  name: "John",
  email: `john.${Date.now()}@dollar.com`,
  password: "Password1",
  organizationName: `Org ${Date.now()}`,
  role: "admin"
}

export const newProduct = {
  name: "Test Product",
  price: 10.99,
  quantity: 5,
}

export const createAdmin = async() =>{
  const adminUser = {
    name: "Admin",
    email: `admin.${Date.now()}@dollar.com`,
    password: "Password1",
    organizationName: `AdminOrg ${Date.now()}`,
  };

  await api.post("/api/auth/register").send(adminUser);

  await query(`
    UPDATE users SET role = $1 WHERE email = $2`, 
    ["admin", adminUser.email]
  );

  const loginRes = await api.post("/api/auth/login").send({ email: adminUser.email, password: adminUser.password });

  return loginRes.body.data.accessToken
} 

