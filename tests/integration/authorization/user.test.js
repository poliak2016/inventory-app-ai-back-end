import { api } from "../../setup/testClient.js";
import {newUser} from "../../setup/factory.js"

describe("Auth /api/auth/user", ()=>{
  it("Should return 401 if token is missing", async () => {
    const res = await api.get("/api/auth/user");
    expect(res.statusCode).toBe(401);
  });

  it("GET /auth/user with valid token 200 + correct user payload", async () =>{

     await api.post("/api/auth/register").send(newUser);

    const loginRes = await api.post("/api/auth/login").send({
      email: newUser.email,
      password: newUser.password
    });

    const token = loginRes.body.accessToken;
    expect(loginRes.body.accessToken).toBeDefined();
    

    const res = await api.get("/api/auth/user").set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    
  });

  it("Should return new refresh token", async()=>{

    await api.post("/api/auth/register").send(newUser);

    const loginRes = await api.post("/api/auth/login").send({
      email: newUser.email,
      password: newUser.password,
    });
    const cookies = loginRes.headers["set-cookie"];

    const res = await api.post("/api/auth/refresh").set("Cookie", cookies);

    expect(res.statusCode).toBe(200);
    expect(res.body.accessToken).toBeDefined();
    expect(res.headers["set-cookie"]).toBeDefined();
  });
})