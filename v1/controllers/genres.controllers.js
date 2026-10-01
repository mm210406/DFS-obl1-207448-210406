import {
  createGenreService,
  getGenresService,
  getTmdbGenresWithStatusService,
  getGenreByIdService,
  updateGenreService,
  deleteGenreService,
} from "../services/genres.services.js";

export const createGenre = async (req, res) => {
  const genre = await createGenreService(req.validatedBody);
  res.status(201).json(genre);
};

export const getGenres = async (req, res) => {
  const genres = await getGenresService();
  res.json(genres);
};

export const getTmdbGenres = async (req, res) => {
  const genres = await getTmdbGenresWithStatusService();
  res.json(genres);
};

export const getGenreById = async (req, res) => {
  const genre = await getGenreByIdService(req.validatedParams.id);
  res.json(genre);
};

export const updateGenre = async (req, res) => {
  const genre = await updateGenreService(req.validatedParams.id, req.validatedBody);
  res.json(genre);
};

export const deleteGenre = async (req, res) => {
  await deleteGenreService(req.validatedParams.id);
  res.json({
    mensaje: "Género eliminado",
  });
};
