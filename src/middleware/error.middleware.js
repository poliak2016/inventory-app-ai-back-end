export const errorMiddleware = (err, req, res, next) => {
  console.error("ERROR:",err);

  const status = err.statusCode || 500;

  res.status(status).json({
    status: "error",
    message: err.message,
    details: err.details || null,
  });
}