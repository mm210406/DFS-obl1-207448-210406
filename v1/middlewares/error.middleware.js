export const errorMiddleware = (err, req, res, next) => {
    res.status(err.status || 500).json({ mensaje: err.message || "Error interno del servidor" });
}