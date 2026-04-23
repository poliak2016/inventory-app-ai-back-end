import { api } from "../../setup/testClient.js";

describe("Register flow", () => {
  it("Should create new user", async () => {
    const payload = {
      name: "Test User",
      email: `test.${Date.now()}@example.com`,
      password: "Password1",
      organizationName: "Test Organization",
    };

    const res = await api.post("/api/auth/register").send(payload);

    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.email).toBe(payload.email);
    expect(res.body.name).toBe(payload.name);
    expect(res.body.organization_id).toBeDefined();
    // service currently creates the initial user as an admin for the org
    expect(res.body.role).toBe("admin");
  });
});

