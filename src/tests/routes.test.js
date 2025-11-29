/* eslint-env jest */
import request from "supertest";
import app from "../app.js";

describe("products API", () => {
  it("should return list of products", async () => {
    const res = await request(app).get("/products");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status", "List of products");
    expect(res.headers["content-type"]).toMatch(/json/);
  });
});
