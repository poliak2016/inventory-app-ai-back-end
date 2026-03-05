import { pool } from "./pool.js"

export const transactionFunc = async (cb) =>{
  
  const client = await pool.connect();

  try{
    await client.query(`BEGIN`)
    const result = await cb(client)
    await client.query(`COMMIT`)
    return result
  } catch (err) {
    await client.query(`ROLLBACK`)
    throw err
  } finally {
    client.release()
  }

}