import Joi from "joi";

// Un ObjectId de Mongo tiene 24 caracteres hexadecimales
export const idParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
