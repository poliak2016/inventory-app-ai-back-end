import { pool } from "../../../src/db/pool.js"; // або твій шлях до pool

describe("DB integration", () => {

  it("connects and executes a simple query", async () => {
    const res = await pool.query("SELECT NOW() AS now, 1 + 1 AS two");

    expect(res).toHaveProperty("rows");
    expect(res.rows).toHaveLength(1);
    expect(res.rows[0]).toHaveProperty("now");
    expect(res.rows[0].two).toBe(2);
  });

  it("can start and rollback a transaction", async () => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const r1 = await client.query("SELECT 10 AS x");
      expect(r1.rows[0].x).toBe(10);

      // нічого не змінюємо в БД — але показуємо правильний шаблон
      await client.query("ROLLBACK");
    } finally {
      client.release();
    }
  });
});