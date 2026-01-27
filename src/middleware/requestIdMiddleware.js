import crypto from "node:crypto"

export const requestId = (req,res,next) => {
 const id = crypto.randomUUID();
 req.requestId = id;
 res.setHeader("x-request-id", id);
 next()
}