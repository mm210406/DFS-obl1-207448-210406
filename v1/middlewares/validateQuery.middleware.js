export const validateQueryMiddleware = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.query, { abortEarly: false });
  if (error) {
    return res.status(400).json({ mensaje: "Error de validación", error });
  }
  req.validatedQuery = value;
  next();
};
