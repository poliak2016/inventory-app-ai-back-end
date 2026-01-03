/* eslint-env jest */
import request from "supertest";
import app from "../../../src/app.js";

console.log("TEST DB_HOST:", process.env.DB_HOST);
console.log("TEST DATABASE_URL:", process.env.DATABASE_URL);

describe("products API (integration)", () => {
  let createdId;

  beforeAll(async () => {
    const newProduct = {
      name: "Test Product",
      price: 10.99,
      quantity: 5,
    };
    const res = await request(app)
      .post("/api/products")
      .send(newProduct);


    createdId = res.body.data.id; 
    expect(createdId).toBeDefined();

    console.log("POST/api/products->", res.statusCode, res.body);

  });

  it("should return list of products", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.headers["content-type"]).toMatch(/json/);
  });

  it("should return item by id", async () => {
    const res = await request(app).get(`/api/products/${createdId}`);
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

    const res = await request(app).put(`/api/products/${createdId}`)
    .send(updateProductTest)

    expect(res.status).toBe(200)
    expect(res.body.data).toMatchObject(updateProductTest)
    expect(Number(res.body.data.price)).toBe(10)
    expect(res.body.data.quantity).toBe(1)
  });

  it("should delete product", async() => {
    const res = await request(app).delete(`/api/products/${createdId}`);
    expect(res.status).toBe(204);
    expect(res.body).toEqual({})
  });
});
