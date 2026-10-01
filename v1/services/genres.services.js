import Genre from "../models/genre.model.js";
import Review from "../models/review.model.js";
import { getTmdbGenresService } from "./movies.services.js";
import { createError } from "../utils/error.util.js";

export const createGenreService = async (data) => {
  const tmdbGenres = await getTmdbGenresService();
  const tmdbGenre = tmdbGenres.find((genre) => genre.id === data.tmdbId);
  if (!tmdbGenre) {
    throw createError(400, "El género no existe en TMDB");
  }

  const name = data.name || tmdbGenre.name;
  const genreWithTmdbId = await Genre.findOne({ tmdbId: data.tmdbId });
  const genreWithName = await Genre.findOne({ name });
  if (genreWithTmdbId || genreWithName) {
    throw createError(409, "El género ya existe");
  }

  return await Genre.create({ ...data, name });
};

export const getGenresService = () => Genre.find().sort({ name: 1 });

export const getTmdbGenresWithStatusService = async () => {
  const tmdbGenres = await getTmdbGenresService();
  const dbGenres = await Genre.find();

  return tmdbGenres.map((tmdbGenre) => {
    const dbGenre = dbGenres.find((genre) => genre.tmdbId === tmdbGenre.id);
    return {
      tmdbId: tmdbGenre.id,
      name: tmdbGenre.name,
      created: Boolean(dbGenre),
      genreId: dbGenre?._id,
      allowed: dbGenre?.allowed,
      icon: dbGenre?.icon,
    };
  });
};

export const getGenreByIdService = async (id) => {
  const genre = await Genre.findById(id);
  if (!genre) {
    throw createError(404, "Género no encontrado");
  }
  return genre;
};

export const updateGenreService = async (id, data) => {
  const genre = await Genre.findByIdAndUpdate(id, data, { returnDocument: "after" });
  if (!genre) {
    throw createError(404, "Género no encontrado");
  }
  return genre;
};

export const deleteGenreService = async (id) => {
  if (await Review.findOne({ genres: id })) {
    throw createError(409, "No se puede eliminar un género utilizado por reseñas");
  }
  const genre = await Genre.findByIdAndDelete(id);
  if (!genre) {
    throw createError(404, "Género no encontrado");
  }
  return genre;
};
