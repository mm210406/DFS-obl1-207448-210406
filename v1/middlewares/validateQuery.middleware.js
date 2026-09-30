export const validateQueryMiddleware = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.query, { abortEarly: false });
  if (error) {
    const details = error.details.map(({ message, path }) => ({ message, path }));
    return res.status(400).json({ mensaje: "Error de validación", error: { details } });
  }
  req.validatedQuery = value;
  next();
};
