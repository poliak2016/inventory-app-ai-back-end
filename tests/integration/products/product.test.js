/* eslint-env jest */
import { api } from "../../setup/testClient.js";
import { createAdmin } from "../../helpers/auth.helper.js";
import { newProduct } from "../../fixtures/product.fixture.js";

describe("products API (integration)", () => {

  it("POST /api/products — admin creates product → 201", async () => {
    const token = await createAdmin();

    const res = await api
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send(newProduct);

    expect(res.statusCode).toBe(201);
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.name).toBe(newProduct.name);
    expect(Number(res.body.data.price)).toBe(newProduct.price);
    expect(res.body.data.quantity).toBe(newProduct.quantity);
  });

  it("GET /api/products — returns paginated list → 200", async () => {
    const token = await createAdmin();

    const res = await api
      .get("/api/products")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(Array.isArray(res.body.data.products)).toBe(true);
    expect(res.body.data.pagination).toBeDefined();
    expect(res.body.data.pagination.total).toBeDefined();
  });

  it("GET /api/products/:id — returns product by id → 200", async () => {
    const token = await createAdmin();

    const created = await api
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send(newProduct);

    const createdId = created.body.data.id;

    const res = await api
      .get(`/api/products/${createdId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data.id).toBe(createdId);
    expect(res.body.data.name).toBe(newProduct.name);
  });

  it("PUT /api/products/:id — admin updates product → 200", async () => {
    const token = await createAdmin();
    const updateData = { price: "10.00", quantity: 1, name: "UpdateTest" };

    const created = await api
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send(newProduct);

    const createdId = created.body.data.id;

    const res = await api
      .put(`/api/products/${createdId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateData);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe(updateData.name);
    expect(Number(res.body.data.price)).toBe(10);
    expect(res.body.data.quantity).toBe(updateData.quantity);
  });

  it("DELETE /api/products/:id — admin deletes product → 204", async () => {
    const token = await createAdmin();

    const created = await api
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send(newProduct);

    const createdId = created.body.data.id;

    const res = await api
      .delete(`/api/products/${createdId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
    expect(res.body).toEqual({});
  });
});
