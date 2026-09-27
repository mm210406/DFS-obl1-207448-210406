import Joi from "joi";

export const reviewSchema = Joi.object({
  genreId: Joi.string().required(),
  movieTitle: Joi.string().trim().min(1).max(150).required(),
  externalMovieId: Joi.string().allow("").optional(), //MARTINAVER
  description: Joi.string().trim().min(3).max(2000).required(),
  points: Joi.number().integer().min(1).max(10).required(),
  imageUrl: Joi.string().uri().allow("").optional(),
});
