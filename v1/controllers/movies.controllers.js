import { getCatalogService, getMovieService } from "../services/movies.services.js";

export const getMovies = async (req, res) => {
  const catalog = await getCatalogService(req.validatedQuery);
  res.json(catalog);
};

export const getMovieById = async (req, res) => {
  const movie = await getMovieService(req.validatedParams.tmdbId);
  res.json(movie);
};
