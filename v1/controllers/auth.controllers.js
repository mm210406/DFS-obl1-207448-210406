import { registerService, loginService } from "../services/auth.services.js";

export const register = async (req, res) => {
  const user = await registerService(req.validatedBody);

  res.status(201).json({
    mensaje: "Usuario registrado",
    token: user.token
  });
};

export const login = async (req, res) => {
  const result = await loginService(req.validatedBody);

  res.json(result);
};
