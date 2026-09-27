import Joi from "joi";

export const genreSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),
  description: Joi.string().trim().max(300).allow("").optional(),
});
