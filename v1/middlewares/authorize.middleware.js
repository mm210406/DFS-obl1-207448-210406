export const authorizeAdminMiddleware = (req, res, next) => {
  if (req.user.role !== "ADMIN")
    return res.status(403).json({ mensaje: "Acceso restringido a administradores" });
  next();
};
