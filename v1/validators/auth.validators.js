import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().trim().min(3).max(30).required().messages({
    "string.base": "El nombre debe ser un texto",
    "string.empty": "El nombre no puede estar vacío",
    "string.min": "El nombre debe tener al menos {#limit} caracteres",
    "string.max": "El nombre no puede tener más de {#limit} caracteres",
    "any.required": "El nombre es obligatorio",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "El email debe ser un texto",
    "string.empty": "El email no puede estar vacío",
    "string.email": "El email debe tener un formato válido",
    "any.required": "El email es obligatorio",
  }),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])"))
    .required()
    .messages({
      "string.base": "La contraseña debe ser un texto",
      "string.empty": "La contraseña no puede estar vacía",
      "string.min": "La contraseña debe tener al menos {#limit} caracteres",
      "string.pattern.base": "La contraseña debe contener al menos una letra y un número",
      "any.required": "La contraseña es obligatoria",
    }),
  repeatPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Las contraseñas deben coincidir",
    "any.required": "Debe repetir la contraseña",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "El email debe ser un texto",
    "string.empty": "El email no puede estar vacío",
    "string.email": "El email debe tener un formato válido",
    "any.required": "El email es obligatorio",
  }),
  password: Joi.string().required().messages({
    "string.base": "La contraseña debe ser un texto",
    "string.empty": "La contraseña no puede estar vacía",
    "any.required": "La contraseña es obligatoria",
  }),
});
