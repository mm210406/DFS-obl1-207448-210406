import Joi from "joi";

export const objectIdRule = Joi.string().hex().length(24);

export const idParamSchema = Joi.object({
  id: objectIdRule.required(),
});
