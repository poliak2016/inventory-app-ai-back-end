import { api } from "../setup/testClient.js";
import { query } from "../../src/db/query.js";

export const createAdmin = async () => {
  const adminUser = {
    name: "Admin",
    email: `admin.${Date.now()}@example.com`,
    password: "Password1",
    organizationName: `AdminOrg ${Date.now()}`,
  };

  await api.post("/api/auth/register").send(adminUser);

  const loginRes = await api.post("/api/auth/login").send({
    email: adminUser.email,
    password: adminUser.password,
  });

  return loginRes.body.data.accessToken;
};

export const createStaff = async () => {
  const staffUser = {
    name: "Staff",
    email: `staff.${Date.now()}@example.com`,
    password: "Password1",
    organizationName: `StaffOrg ${Date.now()}`,
  };

  await api.post("/api/auth/register").send(staffUser);

  await query(
    `UPDATE users SET role = $1 WHERE email = $2`,
    ["staff", staffUser.email]
  );

  const loginRes = await api.post("/api/auth/login").send({
    email: staffUser.email,
    password: staffUser.password,
  });

  return loginRes.body.data.accessToken;
};
