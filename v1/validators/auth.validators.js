import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().trim().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])"))
    .required(),
  repeatPassword: Joi.any().valid(Joi.ref("password")).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
