import { api } from "../../setup/testClient.js";

describe("health check api", () => {
  it("should return status 200 and status OK", async () => {
    const res = await api.get("/api/health");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status", "OK");
    expect(res.body).toHaveProperty("timestamp");
  });
});
