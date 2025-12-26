export const errorMiddleware = (err, req, res, next) => {

  if (res.headersSent) return next(err);
  
  console.error("ERROR:",err.message);

  const status = err.statusCode || 500;

  res.status(status).json({
    status: "error",
    message: err.message,
    details: err.details || null,
  });
}