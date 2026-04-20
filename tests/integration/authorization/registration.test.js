import { api } from "../../setup/testClient.js";
import { newUser} from "../../setup/factory.js"

describe("Register flow", () => {
  it("Should create new user", async() => {

    const res = await api
    .post("/api/auth/register")
    .send(newUser)
  
    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.email).toBe(newUser.email);
    expect(res.body.role).toBe("user");
  })
  });

