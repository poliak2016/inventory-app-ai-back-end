import { query } from "../../src/db/query.js";

describe("database connection", () => {
  it("should execute a simple query successfully", async () => {
    const result = await query("SELECT NOW()");

    expect(result).toHaveProperty("rows");
    expect(result.rows.length).toBe(1);
    expect(result.rows[0]).toHaveProperty("now");
  });
});