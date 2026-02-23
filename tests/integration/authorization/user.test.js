import { api } from "../../setup/testClient.js";

describe("Auth /api/auth/user", ()=>{
  it("Should return 401 if token is missing", async () => {
    const res = await api.get("/api/auth/user");
    expect(res.statusCode).toBe(401);
  });
})