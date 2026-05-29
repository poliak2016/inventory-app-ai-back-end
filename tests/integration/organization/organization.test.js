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
});

