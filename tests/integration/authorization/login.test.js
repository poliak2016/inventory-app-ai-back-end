import { api } from "../../setup/testClient.js";
import { newUser } from "../../fixtures/user.fixture.js";

describe("Auth /api/auth/login", () => {
  it("Should login and access user profile", async () => {
    await api.post("/api/auth/register").send(newUser);

    const loginRes = await api.post("/api/auth/login").send({
      email: newUser.email,
      password: newUser.password,
    });

    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body.data.accessToken).toBeDefined();

    const meRes = await api
      .get("/api/auth/user")
      .set("Authorization", `Bearer ${loginRes.body.data.accessToken}`);

    expect(meRes.statusCode).toBe(200);
  });

  it("Should return 401 after wrong password", async () => {
    await api.post("/api/auth/register").send(newUser);

    const res = await api.post("/api/auth/login").send({
      email: newUser.email,
      password: "WrongPassword123",
    });

    expect(res.statusCode).toBe(401);
  });
});