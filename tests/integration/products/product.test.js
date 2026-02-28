/* eslint-env jest */
import { api } from "../../setup/testClient.js";
import { logger } from "../../../src/config/logger.js";
import { createAdmin, newProduct } from "../../setup/factory.js";

describe("products API (integration)", () => {
  
  it("Should create new product", async()=>{

    const res = await api
      .post("/api/products")
      .send(newProduct);


    const createdId = res.body.data.id; 
    expect(createdId).toBeDefined();

    logger.info("POST/api/products->", res.statusCode, res.body);
  });

  it("should return list of products", async () => {

    const res = await api.get("/api/products");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.headers["content-type"]).toMatch(/json/);
  });

  it("should return item by id", async () => {

    const product = await api.post("/api/products").send(newProduct)

    const createdId = product.body.data.id

    const res = await api.get(`/api/products/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data.id).toBe(createdId);
  });

  it("should update product data", async() => {
    const updateProductTest = {
      "price": "10.00",
      "quantity" : 1,
      "name": "UpdateTest"
    };

    const product = await api.post("/api/products").send(newProduct)

    const createdId = product.body.data.id

    const res = await api.put(`/api/products/${createdId}`)
    .send(updateProductTest)

    expect(res.status).toBe(200)
    expect(res.body.data).toMatchObject(updateProductTest)
    expect(Number(res.body.data.price)).toBe(10)
    expect(res.body.data.quantity).toBe(1)
  });

  it("Should delete product", async() => {

    let admin = await createAdmin()

    const product = await api.post("/api/products").set("Authorization", `Bearer ${admin}`).send(newProduct)

    const createdId = product.body.data.id

    const res = await api.delete(`/api/products/${createdId}`).set("Authorization", `Bearer ${admin}`);
    expect(res.status).toBe(204);
    expect(res.body).toEqual({})
  });
});
