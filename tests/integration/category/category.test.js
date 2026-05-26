import { api } from "../../setup/testClient.js";
import { newCategory } from "../../fixtures/category.fixture.js";
import { createAdmin } from "../../helpers/auth.helper.js";

describe("categories API (integration)", () => {
  it("POST/api/category — admin creates product → 201", async () => {
    const admin = await createAdmin();

    const res = await api
      .post("/api/categories")
      .set("Authorization", `Bearer ${admin}`)
      .send(newCategory)

      expect(res.statusCode).toBe(201)
  });

  it("GEt/api/categories — admin take list of categories → 200", async () => {
     const admin = await createAdmin();

     await api
      .post("/api/categories")
      .set("Authorization", `Bearer ${admin}`)
      .send(newCategory)

    const res = await api
      .get("/api/categories")
      .set("Authorization", `Bearer ${admin}`)

    expect(res.statusCode).toBe(200)
  });

  it("PUT/api/categories/:id — admin change the name of category → 200", async () => {
    const admin = await createAdmin();

    const newName = {
      name: "New category name"
    }

    const category = await  api
      .post("/api/categories")
      .set("Authorization", `Bearer ${admin}`)
      .send(newCategory);

    const id = category.body.data.id;

    const res = await api
      .patch(`/api/categories/${id}`)
      .set("Authorization", `Bearer ${admin}`)
      .send(newName);

    expect(res.statusCode).toBe(200)
  });

  it("DELETE/api/categories/:id — admin deletes category → 204", async () => {
     const admin = await createAdmin();

     const category = await  api
      .post("/api/categories")
      .set("Authorization", `Bearer ${admin}`)
      .send(newCategory);
    
    const id = category.body.data.id;
    
    const res = await api
      .delete(`/api/categories/${id}`)
      .set("Authorization", `Bearer ${admin}`)

    expect(res.statusCode).toBe(204)
  });
});