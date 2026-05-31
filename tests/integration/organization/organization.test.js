import { createAdmin } from "../../helpers/auth.helper.js"
import { api } from "../../setup/testClient"

describe("Organization flow tests", () => {
  it("GET/api/organization/me -> 200", async () => {
    const token = await createAdmin()

    const res = await api
      .get(`/api/organizations/me`)
      .set("Authorization", `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
  });

  it("PATCH/api/organization/me -> 200", async () => {
    const token = await createAdmin()

    const res = await api
      .patch(`/api/organizations/me`)
      .set("Authorization", `Bearer ${token}`)
      .send({name: "New Org Name"})

    expect(res.statusCode).toBe(200)
  });

  it("GET/api/organizations/me - without token -> 401", async () => {
    const res = await api
      .get("/api/organizations/me")

    expect(res.statusCode).toBe(401)
  });

  it("PATCH/api/organizations/me - empty name -> 400", async () => {
    const token = await createAdmin()

    const res = await api
      .patch("/api/organizations/me")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "" })

    expect(res.statusCode).toBe(400)
  });
});

