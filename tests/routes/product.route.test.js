/* eslint-env jest */
import request from "supertest";
import app from "../../src/app.js";

describe("products API", () => {
  it("should return list of products", async () => {
    const res = await request(app).get("/products");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.headers["content-type"]).toMatch(/json/);
  });
});
