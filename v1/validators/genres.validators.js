import Joi from "joi";

const nameRules = Joi.string().trim().min(2).max(50).messages({
    "string.base": "El nombre debe ser un texto",
    "string.empty": "El nombre no puede estar vacío",
    "string.min": "El nombre debe tener al menos {#limit} caracteres",
    "string.max": "El nombre no puede tener más de {#limit} caracteres",
    "any.required": "El nombre es obligatorio",
});

const allowedRules = Joi.boolean().messages({
  "boolean.base": "allowed debe ser true o false",
});

const iconRules = Joi.string().trim().max(16).allow("").messages({
  "string.base": "El ícono debe ser un texto",
  "string.max": "El ícono no puede tener más de {#limit} caracteres",
});

export const createGenreSchema = Joi.object({
  tmdbId: Joi.number().integer().min(1).required().messages({
    "number.base": "El tmdbId debe ser un número",
    "number.integer": "El tmdbId debe ser un número entero",
    "number.min": "El tmdbId debe ser mayor a 0",
    "any.required": "El tmdbId es obligatorio",
  }),
  name: nameRules,
  allowed: allowedRules,
  icon: iconRules,
});

export const updateGenreSchema = Joi.object({
  name: nameRules,
  allowed: allowedRules,
  icon: iconRules,
})
  .min(1)
  .messages({
    "object.min": "Debe enviar al menos un campo para modificar",
  });
