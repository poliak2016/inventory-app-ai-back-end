import {query} from "../db/query.js" 
import { asyncHandler } from "../middleware/asyncHandler.js";

export const healthCheck = asyncHandler(async(req, res) => {

  const result = await query(`SELECT NOW()`)

  return res.status(200).json({ 
    status: "OK", 
    timestamp: new Date().toISOString() ,
    db: {
      status: "connected",
      now: result.rows[0].now
    } 
  });
});
