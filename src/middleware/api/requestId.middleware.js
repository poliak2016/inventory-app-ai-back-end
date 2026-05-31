import { randomUUID } from "crypto"

export const requestId = (req, res, next) => {
  req.requestId = randomUUID();
  res.setHeader("X-Request-Id", req.requestId)
  next() 
}