import Review from "../models/review.model.js";
import User from "../models/user.model.js";
import { getMovieService } from "./movies.services.js";
import { updateRecommendationsService } from "./recommendations.services.js";

export const PLUS_REVIEW_LIMIT = 4;

const createError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const createReviewService = async (userId, data) => {
  const user = await User.findById(userId);
  if (!user) {
    throw createError(404, "Usuario no encontrado");
  }

  const reviewCount = await Review.countDocuments({ userId });
  if (user.plan === "PLUS" && reviewCount >= PLUS_REVIEW_LIMIT) {
    throw createError(403, `El plan PLUS permite un máximo de ${PLUS_REVIEW_LIMIT} reseñas`);
  }

  const alreadyReviewed = await Review.exists({ userId, tmdbId: data.tmdbId });
  if (alreadyReviewed) {
    throw createError(409, "Ya reseñaste esta película");
  }

  const movie = await getMovieService(data.tmdbId);

  const review = await Review.create({
    userId,
    tmdbId: movie.tmdbId,
    movieTitle: movie.title,
    synopsis: movie.overview,
    genres: movie.genres.map((genre) => genre._id),
    description: data.description,
    points: data.points,
    imageUrl: data.imageUrl || movie.posterUrl,
  });

  await review.populate("genres", "name");
  const recommendations = await updateRecommendationsService(userId);

  return { review, recommendations };
};

export const getReviewsService = async (userId, { page, limit, genreId, points, title }) => {
  const filter = { userId };

  if (genreId) filter.genres = genreId;
  if (points) filter.points = points;
  if (title) filter.movieTitle = { $regex: escapeRegex(title), $options: "i" };

  const total = await Review.countDocuments(filter);
  const reviews = await Review.find(filter)
    .populate("genres", "name")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return { page, limit, total, pages: Math.ceil(total / limit), reviews };
};

export const getReviewByIdService = async (userId, id) => {
  const review = await Review.findOne({ _id: id, userId }).populate("genres", "name");
  if (!review) {
    throw createError(404, "Reseña no encontrada");
  }
  return review;
};

export const updateReviewService = async (userId, id, data) => {
  const review = await Review.findOneAndUpdate({ _id: id, userId }, data, {
    returnDocument: "after",
    runValidators: true,
  }).populate("genres", "name");
  if (!review) {
    throw createError(404, "Reseña no encontrada");
  }
  return review;
};

export const deleteReviewService = async (userId, id) => {
  const review = await Review.findOneAndDelete({ _id: id, userId });
  if (!review) {
    throw createError(404, "Reseña no encontrada");
  }
  return review;
};
