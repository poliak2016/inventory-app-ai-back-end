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
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.email).toBe(payload.email);
    expect(res.body.data.name).toBe(payload.name);
    expect(res.body.data.organizationId).toBeDefined();
    expect(res.body.data.role).toBe("admin");
  });
});

