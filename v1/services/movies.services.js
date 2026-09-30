import axios from "axios";
import Genre from "../models/genre.model.js";
import Review from "../models/review.model.js";
import { createError } from "../utils/error.util.js";

const TMDB_URL = "https://api.themoviedb.org/3";
const POSTER_URL = "https://image.tmdb.org/t/p/w500";
const TMDB_MAX_PAGES = 500;

const tmdbGet = async (path, params = {}) => {
  try {
    const response = await axios.get(`${TMDB_URL}${path}`, {
      params: { api_key: process.env.TMDB_API_KEY, language: "es-MX", ...params },
      timeout: 5000,
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw createError(404, "Película no encontrada");
    }
    throw createError(503, "El servicio de películas no está disponible");
  }
};

export const getTmdbGenresService = async () => {
  const data = await tmdbGet("/genre/movie/list");
  return data.genres;
};

export const isMovieAllowed = (movieGenreIds, allowedGenreIds) =>
  movieGenreIds.length > 0 && movieGenreIds.every((genreId) => allowedGenreIds.includes(genreId));

const formatMovie = (movie, movieGenreIds, dbGenres) => ({
  tmdbId: movie.id,
  title: movie.title,
  overview: movie.overview,
  releaseDate: movie.release_date,
  posterUrl: movie.poster_path ? `${POSTER_URL}${movie.poster_path}` : "",
  genres: dbGenres
    .filter((genre) => movieGenreIds.includes(genre.tmdbId))
    .map((genre) => ({ _id: genre._id, name: genre.name })),
});

const getGenreLists = async () => {
  const dbGenres = await Genre.find();
  const allowedGenreIds = dbGenres.filter((genre) => genre.allowed).map((genre) => genre.tmdbId);
  return { dbGenres, allowedGenreIds };
};

export const getCatalogService = async ({ page, title }) => {
  const { dbGenres, allowedGenreIds } = await getGenreLists();

  let data;
  if (title) {
    data = await tmdbGet("/search/movie", { query: title, page, include_adult: false });
  } else {
    const tmdbGenres = await getTmdbGenresService();
    const excludedGenreIds = tmdbGenres
      .map((genre) => genre.id)
      .filter((genreId) => !allowedGenreIds.includes(genreId));

    data = await tmdbGet("/discover/movie", {
      page,
      include_adult: false,
      sort_by: "popularity.desc",
      without_genres: excludedGenreIds.join("|") || undefined,
    });
  }

  const movies = data.results
    .filter((movie) => !movie.adult && isMovieAllowed(movie.genre_ids, allowedGenreIds))
    .map((movie) => formatMovie(movie, movie.genre_ids, dbGenres));

  return {
    page: data.page,
    totalPages: Math.min(data.total_pages, TMDB_MAX_PAGES),
    movies,
  };
};

export const getMovieService = async (tmdbId, userId) => {
  const { dbGenres, allowedGenreIds } = await getGenreLists();
  const movie = await tmdbGet(`/movie/${tmdbId}`);
  const movieGenreIds = movie.genres.map((genre) => genre.id);

  if (movie.adult || !isMovieAllowed(movieGenreIds, allowedGenreIds)) {
    const hasReview = userId && (await Review.exists({ userId, tmdbId }));
    if (!hasReview) {
      throw createError(404, "Película no encontrada");
    }
  }

  if (!movie.overview) {
    try {
      const englishMovie = await tmdbGet(`/movie/${tmdbId}`, { language: "en-US" });
      movie.overview = englishMovie.overview;
    } catch {
      console.error("No se pudo obtener la sinopsis de la película.");
    }
  }

  return formatMovie(movie, movieGenreIds, dbGenres);
};
