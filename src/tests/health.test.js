/* eslint-env jest */
import request from "supertest";
import app from "../app.js";

describe("health check api", () => {
  it("should return status 200 and status OK", async () => {
    const res = await request(app).get("/health");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status", "OK");
    expect(res.body).toHaveProperty("timestamp");
  });
});
