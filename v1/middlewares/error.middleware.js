export const errorMiddleware = (err, req, res, next) => {
  if (err.code === 11000) {
    return res.status(409).json({ mensaje: "Ya existe un registro con ese valor" });
  }

  const status = err.status || 500;
  if (status === 500) console.error(err);
  res.status(status).json({
    mensaje: status === 500 ? "Error interno del servidor" : err.message,
  });
};
