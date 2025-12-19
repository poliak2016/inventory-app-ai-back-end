import {query} from "../db/query.js" 

export const healthCheck = async(req, res) => {

  await query(`SELECT NOW()`)

  return result = res.status(200).json({ 
    status: "OK", 
    timestamp: new Date().toISOString() ,
    db: "connected",
  });
};
